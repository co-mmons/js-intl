import * as fileSystem from "fs-extra";
import * as https from "https";
import * as path from "path";

export class GoogleSheetImporter {
    
    constructor() {
    }

    private documents: GoogleDocument[] = [];

    public addDocument(id: string, worksheet?: string, filterTags?: string[]) {
        this.documents.push({id: id, worksheet: worksheet, filterTags: filterTags});
    }

    public outputPath: string;

    public outputType: "json" | "ts" = "json";

    public async generate() {

        let output: {[key: string]: string} = {};
        let data: {[locale: string]: LocaleDictionary} = {};

        for (let resource of this.documents) {

            let result = (await this.readDocument(resource));

            for (let locale in result) {

                if (!data[locale]) {
                    data[locale] = {};
                }

                for (let key in result[locale]) {

                    if (!data[locale][key]) {
                        data[locale][key] = result[locale][key];
                    }
                }
            }
        }

        fileSystem.ensureDirSync(this.outputPath);

        for (let locale in data) {

            let filePath = path.resolve(this.outputPath, `${locale}.${this.outputType}`);

            if (!Object.keys(data[locale]).length) {
                
                try {
                    fileSystem.unlinkSync(filePath);
                } catch (e) {
                }

                continue;
            }

            let sorted = {};

            for (let key of Object.keys(data[locale]).sort((a, b) => a.localeCompare(b))) {
                sorted[key] = data[locale][key];
            }
            
            if (this.outputType == "json") {
                fileSystem.writeJsonSync(filePath, sorted, {spaces: 4, encoding: "UTF-8"});
            }
        }
    }

    private fetchHttps(url: string): Promise<string> {

        return new Promise((resolve, reject) => {
            let contents = "";
            https.get(url, (response) => {
                response.on("data", chunk => contents += chunk);
                response.on("end", () => resolve(contents));
            }).on("error", error => reject(error));
        });
    }

    private async readDocument(document: GoogleDocument): Promise<{[locale: string]: LocaleDictionary}> {
        try {

            let json = JSON.parse((await this.fetchHttps(`https://spreadsheets.google.com/feeds/cells/${document.id}/${document.worksheet || 'default'}/public/values?alt=json`)));

            let rows: string[][] = [];
            let columns: {[column: string]: number} = {};
            let data: {[locale: string]: LocaleDictionary} = {};

            // convert json to rows|cells arrays
            for (let entry of json.feed.entry) {
                
                if (!entry.gs$cell) {
                    continue;
                }

                let rowIndex = parseInt(entry.gs$cell.row) - 2;
                let colIndex = parseInt(entry.gs$cell.col) - 1;

                // header row
                if (rowIndex < 0) {
                    columns[entry.gs$cell.$t] = colIndex;

                    if (entry.gs$cell.$t.startsWith("#") && entry.gs$cell.$t != "#default") {
                        data[entry.gs$cell.$t.substring(1)] = {};
                    }
                } 

                // keys row
                else {

                    while (rowIndex >= rows.length) {
                        rows.push([]);
                    }

                    let row = rows[rowIndex];

                    while (colIndex >= row.length) {
                        row.push("");
                    }

                    row[colIndex] = entry.gs$cell.$t;
                }
            }

            ROWS: for (let row of rows) {

                if (row[columns.key]) {

                    // filter by tags
                    TAGS: if (document.filterTags) {
                        let tags: any = row[columns.tags];

                        if (!tags) {
                            continue ROWS;
                        } else {
                            tags = tags.split(",");
                        }

                        for (let tag of document.filterTags) {
                            for (let t of tags) {
                                if (tag == t) {
                                    break TAGS;
                                }
                            }
                        }

                        continue ROWS;
                    }

                    let alias: any = row[columns.alias];

                    // alias column contain JSON string (quoted)
                    if (alias && alias.startsWith("\"")) {
                        alias = [JSON.parse(alias)];
                    }

                    // alias column contain JSON array
                    else if (alias && alias.startsWith("[")) {
                        alias = JSON.parse(alias);
                    }

                    // comma separated keys
                    else if (alias) {
                        alias = alias.split(",");
                    }

                    let keys = [row[columns.key]].concat(alias);

                    for (let locale in data) {
                        let value = (row[columns[`#${locale}`]] || row[columns["#default"]]).trim();

                        if (value) {

                            let alias: any = row[columns.alias];
                            
                            // alias column contain JSON string (quoted)
                            if (alias && alias.startsWith("\"")) {
                                alias = [JSON.parse(alias)];
                            } 
                            
                            // alias column contain JSON array
                            else if (alias && alias.startsWith("[")) {
                                alias = JSON.parse(alias);
                            }
                            
                            // comma separated keys
                            else if (alias) {
                                alias = alias.split(",");
                            }

                            for (let key of keys) {
                                key = key.trim();

                                if (key) {
                                    data[locale][key] = value;
                                }
                            }
                        }
                    }
                }
            }

            return data;

        } catch (error) {
            throw error;
        }
    }
}

interface GoogleDocument {
    id: string; 
    worksheet: string;
    filterTags: string[];
}

interface LocaleDictionary {
    [key: string]: string;
}