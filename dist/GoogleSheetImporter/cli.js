'use strict';

var yargs = require('yargs');
var fileSystem = require('fs-extra');
var https = require('https');
var path = require('path');
var htmlparser2 = require('htmlparser2');

class GoogleSheetImporter {
    constructor() {
        this.documents = [];
        this.outputType = "json";
    }
    addDocument(id, worksheet, filterTags) {
        this.documents.push({ id: id, worksheet: worksheet, filterTags: filterTags });
    }
    async generate() {
        let data = {};
        for (let resource of this.documents) {
            let result = (await this.readSheet(resource));
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
                }
                catch (e) {
                }
                continue;
            }
            let sorted = {};
            for (let key of Object.keys(data[locale]).sort((a, b) => a.localeCompare(b))) {
                sorted[key] = data[locale][key];
                // complex value
                if (typeof sorted[key] != "string") {
                    // name of a file, that will contain value of this key
                    // no suffix yet, must be added later, depends on resource type
                    let keyFile = `${locale}-${key.replace(/[^(\w|\d|\.|\@|\_|\-|\,|\$)]/, "-")}.txt`;
                    // Google Document
                    if (sorted[key]["type"] == "GoogleDocument") {
                        let contents = (/(<div id="contents">)(.*)(<\/div><div id="footer">)/g).exec(await this.fetchHttps(sorted[key]["url"]));
                        if (contents.length > 1 && contents[2]) {
                            let html = "";
                            let cssClass = "_intl" + Math.round(Math.random() * 1000);
                            let escape = (text) => {
                                return text.replace(/\{|\}|\#|\\/g, "\\$&");
                            };
                            let currentElementName;
                            let parser = new htmlparser2.Parser({
                                onopentag: (name, attrs) => {
                                    currentElementName = name;
                                    html += `<${name}`;
                                    for (let a in attrs) {
                                        html += ` ${a}="${escape(attrs[a])}"`;
                                    }
                                    html += ">";
                                },
                                onclosetag: (name) => {
                                    if (["br", "img"].indexOf(name) < 0) {
                                        html += `</${name}>`;
                                    }
                                },
                                ontext: (text) => {
                                    if (currentElementName == "style") {
                                        text = text.replace(/(font-size|font-family)\:.*?(\;|\})/g, "$2").replace(/color:#000000(\;|\})/g, "$1");
                                        text = "." + cssClass + " " + escape(text).replace(/\}/g, "}." + cssClass + " ");
                                    }
                                    html += text;
                                }
                            }, { decodeEntities: false });
                            parser.write(contents[2]);
                            fileSystem.writeFileSync(path.resolve(this.outputPath, keyFile), `<div class="${cssClass}">${html}</div>`);
                        }
                    }
                    sorted[key] = { file: keyFile };
                }
            }
            if (this.outputType == "json") {
                fileSystem.writeJsonSync(filePath, sorted, { spaces: 4, encoding: "UTF-8" });
            }
            else if (this.outputType == "ts") {
                fileSystem.writeFileSync(filePath, `export = ${JSON.stringify(sorted, undefined, 4)}`);
            }
        }
    }
    fetchHttps(url) {
        return new Promise((resolve, reject) => {
            let contents = "";
            https.get(url, (response) => {
                response.setEncoding("utf8");
                response.on("data", chunk => contents += chunk);
                response.on("end", () => resolve(contents));
            }).on("error", error => reject(error));
        });
    }
    async readSheet(document) {
        try {
            let json = JSON.parse((await this.fetchHttps(`https://spreadsheets.google.com/feeds/cells/${document.id}/${document.worksheet || 'default'}/public/values?alt=json`)));
            let rows = [];
            let columns = {};
            let data = {};
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
                        let tags = row[columns.tags] ? row[columns.tags].split(",") : ["--empty--"];
                        for (let tag of document.filterTags) {
                            for (let t of tags) {
                                t = t.trim();
                                if (tag === t || t.match(tag)) {
                                    break TAGS;
                                }
                            }
                        }
                        continue ROWS;
                    }
                    let alias = row[columns.alias];
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
                        let value = (row[columns[`#${locale}`]] || "").trim();
                        if (value) {
                            if (value.startsWith("#") && value !== "#default") {
                                value = row[columns[value.toLowerCase()] || columns["#default"]];
                            }
                            if (!value || value === "#default") {
                                value = (row[columns["#default"]] || "").trim();
                            }
                        }
                        else if (this.defaultLocale && columns["#" + this.defaultLocale]) {
                            value = (row[columns["#" + this.defaultLocale]] || "").trim();
                        }
                        if (value) {
                            let alias = row[columns.alias];
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
                                    // value is a reference to external google document
                                    if (columns.type && row[columns.type] == "GoogleDocument") {
                                        data[locale][key] = { type: "GoogleDocument", url: value };
                                    }
                                    // simple text
                                    else {
                                        data[locale][key] = value;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    }
}

const argv = yargs.option("outputPath", { description: "Output directory path" })
    .option("outputType", { description: "Output type", choices: ["json", "ts"] })
    .option("defaultLocale", { description: "Default locale to use, when no translation for some other locale" })
    .option("document", { description: "Google document identifier" })
    .option("worksheet", { description: "Document's worksheet index (1 based) or worksheet name" })
    .option("filterTags", { description: "Comma separated tags, that must be present for keys from worksheet. Key will be taken from worksheet if at least one tag is matched." })
    .demandOption(["outputPath", "outputType", "document"]).argv;
(async () => {
    let importer = new GoogleSheetImporter();
    importer.outputPath = argv["outputPath"];
    importer.outputType = argv["outputType"];
    importer.defaultLocale = argv["defaultLocale"];
    let documents = Array.isArray(argv["document"]) ? argv["document"] : [argv["document"]];
    let sheets = Array.isArray(argv["worksheet"]) ? argv["worksheet"] : [argv["worksheet"]];
    let tags = Array.isArray(argv["filterTags"]) ? argv["filterTags"] : [argv["filterTags"]];
    for (let i = 0; i < documents.length; i++) {
        importer.addDocument(documents[i], sheets.length > i ? sheets[i] : undefined, tags.length > i ? (tags[i] ? tags[i].split(",") : undefined) : undefined);
    }
    try {
        await importer.generate();
    }
    catch (error) {
        console.error(error);
    }
})();
