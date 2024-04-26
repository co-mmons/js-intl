"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetImporter = void 0;
const tslib_1 = require("tslib");
const fileSystem = require("fs-extra");
const https = require("https");
const path = require("path");
const parse_1 = require("@fast-csv/parse");
class GoogleSheetImporter {
    constructor() {
        this.documents = [];
        this.outputType = "json";
    }
    addDocument(id, worksheet, filterTags) {
        this.documents.push({ id: id, worksheet: worksheet, filterTags: filterTags });
    }
    generate() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const output = {};
            const data = {};
            for (const resource of this.documents) {
                const result = resource.id.startsWith("2PACX") ? yield this.readCsv(resource) : yield this.readSheet(resource);
                for (const locale in result) {
                    if (!data[locale]) {
                        data[locale] = {};
                    }
                    for (const key in result[locale]) {
                        if (!data[locale][key]) {
                            data[locale][key] = result[locale][key];
                        }
                    }
                }
                if (this.locales && this.defaultLocale) {
                    for (const locale of this.locales) {
                        if (!data[locale]) {
                            data[locale] = data[this.defaultLocale];
                        }
                    }
                }
            }
            fileSystem.ensureDirSync(this.outputPath);
            for (const locale in data) {
                const filePath = path.resolve(this.outputPath, `${locale}.${this.outputType}`);
                if (!Object.keys(data[locale]).length) {
                    try {
                        fileSystem.unlinkSync(filePath);
                    }
                    catch (e) {
                    }
                    continue;
                }
                let sorted = {};
                // keys, whose values are external resources, e.g. Google Document
                let externals = {};
                for (let key of Object.keys(data[locale]).sort((a, b) => a.localeCompare(b))) {
                    sorted[key] = data[locale][key];
                    // complex value
                    // if (typeof sorted[key] != "string") {
                    //
                    //     // name of a file, that will contain value of this key
                    //     // no suffix yet, must be added later, depends on resource type
                    //     let keyFile = `${locale}-${key.replace(/[^(\w|\d|\.|\@|\_|\-|\,|\$)]/, "-")}.txt`;
                    //
                    //     // Google Document
                    //     if (sorted[key]["type"] == "GoogleDocument") {
                    //
                    //         let contents = (/(<div id="contents">)(.*)(<\/div><div id="footer">)/g).exec(await this.fetchHttps(sorted[key]["url"]));
                    //         if (contents.length > 1 && contents[2]) {
                    //
                    //             let html = "";
                    //
                    //             let cssClass = "_intl" + Math.round(Math.random() * 1000);
                    //
                    //             let escape = (text: string) => {
                    //                 return text.replace(/\{|\}|\#|\\/g, "\\$&");
                    //             }
                    //
                    //             let currentElementName: string;
                    //
                    //             let parser = new Parser({
                    //
                    //                 onopentag: (name, attrs) => {
                    //
                    //                     currentElementName = name;
                    //
                    //                     html += `<${name}`
                    //
                    //                     for (let a in attrs) {
                    //                         html += ` ${a}="${escape(attrs[a])}"`;
                    //                     }
                    //
                    //                     html += ">";
                    //                 },
                    //
                    //                 onclosetag: (name?: string) => {
                    //                     if (["br", "img"].indexOf(name) < 0) {
                    //                         html += `</${name}>`;
                    //                     }
                    //                 },
                    //
                    //                 ontext: (text) => {
                    //
                    //                     if (currentElementName == "style") {
                    //                         text = text.replace(/(font-size|font-family)\:.*?(\;|\})/g, "$2").replace(/color:#000000(\;|\})/g, "$1")
                    //                         text = "." + cssClass + " " + escape(text).replace(/\}/g, "}." + cssClass + " ");
                    //                     }
                    //
                    //                     html += text;
                    //                 }
                    //
                    //             }, {decodeEntities: false});
                    //
                    //             parser.write(contents[2]);
                    //
                    //             fileSystem.writeFileSync(path.resolve(this.outputPath, keyFile), `<div class="${cssClass}">${html}</div>`);
                    //         }
                    //     }
                    //
                    //     sorted[key] = {file: keyFile} as any;
                    // }
                }
                if (this.outputType == "json") {
                    fileSystem.writeJsonSync(filePath, sorted, { spaces: 4, encoding: "UTF-8" });
                }
                else if (this.outputType == "ts") {
                    fileSystem.writeFileSync(filePath, `export default ${JSON.stringify(sorted, undefined, 4)}`);
                }
            }
        });
    }
    fetchHttps(url) {
        return new Promise((resolve, reject) => {
            let contents = "";
            https.get(url, (response) => {
                if (response.statusCode >= 301 && response.statusCode <= 308) {
                    try {
                        resolve(this.fetchHttps(response.headers.location));
                    }
                    catch (e) {
                        reject(e);
                    }
                    finally {
                        return;
                    }
                }
                response.setEncoding("utf8");
                response.on("data", chunk => contents += chunk);
                response.on("end", () => resolve(contents));
            }).on("error", error => reject(error));
        });
    }
    readCsv(document) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = {};
                (0, parse_1.parseString)(yield this.fetchHttps(`https://docs.google.com/spreadsheets/d/e/${document.id}/pub?output=csv&${document.worksheet ? `&gid=${document.worksheet}&single=true` : ""}`), { headers: true })
                    .on("error", err => reject(err))
                    .on("end", () => resolve(data))
                    .on("data", row => {
                    if (row.key) {
                        // filter by tags
                        TAGS: if (document.filterTags) {
                            const tags = row.tags ? row.tags.split(",") : ["--empty--"];
                            for (const tag of document.filterTags) {
                                for (let t of tags) {
                                    t = t.trim();
                                    if (tag === t || t.match(tag)) {
                                        break TAGS;
                                    }
                                }
                            }
                            return;
                        }
                        let alias = row.alias;
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
                        const keys = [row.key].concat(alias);
                        for (const locale of Object.keys(row).filter(locale => locale.startsWith("#") && locale !== "#default").map(locale => locale.substr(1))) {
                            let value = (row[`#${locale}`] || "").trim();
                            if (value) {
                                if (value.startsWith("#") && value !== "#default") {
                                    value = row[value.toLowerCase()] || row["#default"];
                                }
                                if (!value || value === "#default") {
                                    value = (row["#default"] || (this.defaultLocale ? row[`#${this.defaultLocale}`] : "") || "").trim();
                                }
                            }
                            else if (this.defaultLocale && row[`#${this.defaultLocale}`]) {
                                value = (row[`#${this.defaultLocale}`] || "").trim();
                            }
                            if (value) {
                                for (let key of keys) {
                                    key = key.trim();
                                    if (key) {
                                        if (!data[locale]) {
                                            data[locale] = {};
                                        }
                                        // value is a reference to external google document
                                        if (row.type === "GoogleDocument") {
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
                });
            }));
        });
    }
    readSheet(document) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let json = JSON.parse((yield this.fetchHttps(`https://spreadsheets.google.com/feeds/cells/${document.id}/${document.worksheet || 'default'}/public/values?alt=json`)));
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
        });
    }
}
exports.GoogleSheetImporter = GoogleSheetImporter;
//# sourceMappingURL=GoogleSheetImporter.js.map