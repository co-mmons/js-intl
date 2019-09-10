import * as tslib_1 from "tslib";
import * as fileSystem from "fs-extra";
import * as https from "https";
import * as path from "path";
import { Parser } from "htmlparser2";
var GoogleSheetImporter = /** @class */ (function () {
    function GoogleSheetImporter() {
        this.documents = [];
        this.outputType = "json";
    }
    GoogleSheetImporter.prototype.addDocument = function (id, worksheet, filterTags) {
        this.documents.push({ id: id, worksheet: worksheet, filterTags: filterTags });
    };
    GoogleSheetImporter.prototype.generate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var output, data, _i, _a, resource, result, locale, key, _b, _c, _d, locale, filePath, sorted, externals, _loop_1, this_1, _e, _f, key;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        output = {};
                        data = {};
                        _i = 0, _a = this.documents;
                        _g.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        resource = _a[_i];
                        return [4 /*yield*/, this.readSheet(resource)];
                    case 2:
                        result = (_g.sent());
                        for (locale in result) {
                            if (!data[locale]) {
                                data[locale] = {};
                            }
                            for (key in result[locale]) {
                                if (!data[locale][key]) {
                                    data[locale][key] = result[locale][key];
                                }
                            }
                        }
                        _g.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        fileSystem.ensureDirSync(this.outputPath);
                        _b = [];
                        for (_c in data)
                            _b.push(_c);
                        _d = 0;
                        _g.label = 5;
                    case 5:
                        if (!(_d < _b.length)) return [3 /*break*/, 11];
                        locale = _b[_d];
                        filePath = path.resolve(this.outputPath, locale + "." + this.outputType);
                        if (!Object.keys(data[locale]).length) {
                            try {
                                fileSystem.unlinkSync(filePath);
                            }
                            catch (e) {
                            }
                            return [3 /*break*/, 10];
                        }
                        sorted = {};
                        externals = {};
                        _loop_1 = function (key) {
                            var keyFile, contents, _a, _b, html_1, cssClass_1, escape_1, currentElementName_1, parser;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        sorted[key] = data[locale][key];
                                        if (!(typeof sorted[key] != "string")) return [3 /*break*/, 3];
                                        keyFile = locale + "-" + key.replace(/[^(\w|\d|\.|\@|\_|\-|\,|\$)]/, "-") + ".txt";
                                        if (!(sorted[key]["type"] == "GoogleDocument")) return [3 /*break*/, 2];
                                        _b = (_a = (/(<div id="contents">)(.*)(<\/div><div id="footer">)/g)).exec;
                                        return [4 /*yield*/, this_1.fetchHttps(sorted[key]["url"])];
                                    case 1:
                                        contents = _b.apply(_a, [_c.sent()]);
                                        if (contents.length > 1 && contents[2]) {
                                            html_1 = "";
                                            cssClass_1 = "_intl" + Math.round(Math.random() * 1000);
                                            escape_1 = function (text) {
                                                return text.replace(/\{|\}|\#|\\/g, "\\$&");
                                            };
                                            parser = new Parser({
                                                onopentag: function (name, attrs) {
                                                    currentElementName_1 = name;
                                                    html_1 += "<" + name;
                                                    for (var a in attrs) {
                                                        html_1 += " " + a + "=\"" + escape_1(attrs[a]) + "\"";
                                                    }
                                                    html_1 += ">";
                                                },
                                                onclosetag: function (name) {
                                                    if (["br", "img"].indexOf(name) < 0) {
                                                        html_1 += "</" + name + ">";
                                                    }
                                                },
                                                ontext: function (text) {
                                                    if (currentElementName_1 == "style") {
                                                        text = text.replace(/(font-size|font-family)\:.*?(\;|\})/g, "$2").replace(/color:#000000(\;|\})/g, "$1");
                                                        text = "." + cssClass_1 + " " + escape_1(text).replace(/\}/g, "}." + cssClass_1 + " ");
                                                    }
                                                    html_1 += text;
                                                }
                                            }, { decodeEntities: false });
                                            parser.write(contents[2]);
                                            fileSystem.writeFileSync(path.resolve(this_1.outputPath, keyFile), "<div class=\"" + cssClass_1 + "\">" + html_1 + "</div>");
                                        }
                                        _c.label = 2;
                                    case 2:
                                        sorted[key] = { file: keyFile };
                                        _c.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _e = 0, _f = Object.keys(data[locale]).sort(function (a, b) { return a.localeCompare(b); });
                        _g.label = 6;
                    case 6:
                        if (!(_e < _f.length)) return [3 /*break*/, 9];
                        key = _f[_e];
                        return [5 /*yield**/, _loop_1(key)];
                    case 7:
                        _g.sent();
                        _g.label = 8;
                    case 8:
                        _e++;
                        return [3 /*break*/, 6];
                    case 9:
                        if (this.outputType == "json") {
                            fileSystem.writeJsonSync(filePath, sorted, { spaces: 4, encoding: "UTF-8" });
                        }
                        else if (this.outputType == "ts") {
                            fileSystem.writeFileSync(filePath, "export = " + JSON.stringify(sorted, undefined, 4));
                        }
                        _g.label = 10;
                    case 10:
                        _d++;
                        return [3 /*break*/, 5];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    GoogleSheetImporter.prototype.fetchHttps = function (url) {
        return new Promise(function (resolve, reject) {
            var contents = "";
            https.get(url, function (response) {
                response.setEncoding("utf8");
                response.on("data", function (chunk) { return contents += chunk; });
                response.on("end", function () { return resolve(contents); });
            }).on("error", function (error) { return reject(error); });
        });
    };
    GoogleSheetImporter.prototype.readSheet = function (document) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var json, _a, _b, rows, columns, data, _i, _c, entry, rowIndex, colIndex, row, _d, rows_1, row, tags, _e, _f, tag, _g, tags_1, t, alias, keys, locale, value, alias_1, _h, keys_1, key, error_1;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 2, , 3]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.fetchHttps("https://spreadsheets.google.com/feeds/cells/" + document.id + "/" + (document.worksheet || 'default') + "/public/values?alt=json")];
                    case 1:
                        json = _b.apply(_a, [(_j.sent())]);
                        rows = [];
                        columns = {};
                        data = {};
                        // convert json to rows|cells arrays
                        for (_i = 0, _c = json.feed.entry; _i < _c.length; _i++) {
                            entry = _c[_i];
                            if (!entry.gs$cell) {
                                continue;
                            }
                            rowIndex = parseInt(entry.gs$cell.row) - 2;
                            colIndex = parseInt(entry.gs$cell.col) - 1;
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
                                row = rows[rowIndex];
                                while (colIndex >= row.length) {
                                    row.push("");
                                }
                                row[colIndex] = entry.gs$cell.$t;
                            }
                        }
                        ROWS: for (_d = 0, rows_1 = rows; _d < rows_1.length; _d++) {
                            row = rows_1[_d];
                            if (row[columns.key]) {
                                // filter by tags
                                TAGS: if (document.filterTags) {
                                    tags = row[columns.tags] ? row[columns.tags].split(",") : ["--empty--"];
                                    for (_e = 0, _f = document.filterTags; _e < _f.length; _e++) {
                                        tag = _f[_e];
                                        for (_g = 0, tags_1 = tags; _g < tags_1.length; _g++) {
                                            t = tags_1[_g];
                                            t = t.trim();
                                            if (tag === t || t.match(tag)) {
                                                break TAGS;
                                            }
                                        }
                                    }
                                    continue ROWS;
                                }
                                alias = row[columns.alias];
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
                                keys = [row[columns.key]].concat(alias);
                                for (locale in data) {
                                    value = (row[columns["#" + locale]] || row[columns["#default"]]).trim();
                                    if (value) {
                                        alias_1 = row[columns.alias];
                                        // alias column contain JSON string (quoted)
                                        if (alias_1 && alias_1.startsWith("\"")) {
                                            alias_1 = [JSON.parse(alias_1)];
                                        }
                                        // alias column contain JSON array
                                        else if (alias_1 && alias_1.startsWith("[")) {
                                            alias_1 = JSON.parse(alias_1);
                                        }
                                        // comma separated keys
                                        else if (alias_1) {
                                            alias_1 = alias_1.split(",");
                                        }
                                        for (_h = 0, keys_1 = keys; _h < keys_1.length; _h++) {
                                            key = keys_1[_h];
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
                        return [2 /*return*/, data];
                    case 2:
                        error_1 = _j.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GoogleSheetImporter;
}());
export { GoogleSheetImporter };
//# sourceMappingURL=google-sheet-importer.js.map