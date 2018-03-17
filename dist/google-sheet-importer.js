"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileSystem = require("fs-extra");
var https = require("https");
var path = require("path");
var GoogleSheetImporter = /** @class */ (function () {
    function GoogleSheetImporter() {
        this.documents = [];
        this.outputType = "json";
    }
    GoogleSheetImporter.prototype.addDocument = function (id, worksheet, filterTags) {
        this.documents.push({ id: id, worksheet: worksheet, filterTags: filterTags });
    };
    GoogleSheetImporter.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output, data, _i, _a, resource, result, locale, key, locale, filePath, sorted, _b, _c, key;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        output = {};
                        data = {};
                        _i = 0, _a = this.documents;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        resource = _a[_i];
                        return [4 /*yield*/, this.readDocument(resource)];
                    case 2:
                        result = (_d.sent());
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
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        fileSystem.ensureDirSync(this.outputPath);
                        for (locale in data) {
                            filePath = path.resolve(this.outputPath, locale + "." + this.outputType);
                            if (!Object.keys(data[locale]).length) {
                                try {
                                    fileSystem.unlinkSync(filePath);
                                }
                                catch (e) {
                                }
                                continue;
                            }
                            sorted = {};
                            for (_b = 0, _c = Object.keys(data[locale]).sort(function (a, b) { return a.localeCompare(b); }); _b < _c.length; _b++) {
                                key = _c[_b];
                                sorted[key] = data[locale][key];
                            }
                            if (this.outputType == "json") {
                                fileSystem.writeJsonSync(filePath, sorted, { spaces: 4, encoding: "UTF-8" });
                            }
                            else if (this.outputType == "ts") {
                                fileSystem.writeFileSync(filePath, "export = " + JSON.stringify(sorted, undefined, 4));
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GoogleSheetImporter.prototype.fetchHttps = function (url) {
        return new Promise(function (resolve, reject) {
            var contents = "";
            https.get(url, function (response) {
                response.on("data", function (chunk) { return contents += chunk; });
                response.on("end", function () { return resolve(contents); });
            }).on("error", function (error) { return reject(error); });
        });
    };
    GoogleSheetImporter.prototype.readDocument = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var json, _a, _b, rows, columns, data, _i, _c, entry, rowIndex, colIndex, row, _d, rows_1, row, tags, _e, _f, tag, _g, tags_1, t, alias, keys, locale, value, alias_1, _h, keys_1, key, error_1;
            return __generator(this, function (_j) {
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
                                    tags = row[columns.tags];
                                    if (!tags) {
                                        continue ROWS;
                                    }
                                    else {
                                        tags = tags.split(",");
                                    }
                                    for (_e = 0, _f = document.filterTags; _e < _f.length; _e++) {
                                        tag = _f[_e];
                                        for (_g = 0, tags_1 = tags; _g < tags_1.length; _g++) {
                                            t = tags_1[_g];
                                            if (tag == t) {
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
                                else if (alias && alias.startsWith("[")) {
                                    alias = JSON.parse(alias);
                                }
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
                                        else if (alias_1 && alias_1.startsWith("[")) {
                                            alias_1 = JSON.parse(alias_1);
                                        }
                                        else if (alias_1) {
                                            alias_1 = alias_1.split(",");
                                        }
                                        for (_h = 0, keys_1 = keys; _h < keys_1.length; _h++) {
                                            key = keys_1[_h];
                                            key = key.trim();
                                            if (key) {
                                                data[locale][key] = value;
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
exports.GoogleSheetImporter = GoogleSheetImporter;
//# sourceMappingURL=google-sheet-importer.js.map