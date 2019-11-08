#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yargs = require("yargs");
var google_sheet_importer_1 = require("./google-sheet-importer");
var argv = yargs
    .option("outputPath", { description: "Output directory path" })
    .option("outputType", { description: "Output type", choices: ["json", "ts"] })
    .option("defaultLocale", { description: "Default locale to use, when no translation for some other locale" })
    .option("document", { description: "Google document identifier" })
    .option("worksheet", { description: "Document's worksheet index (1 based) or worksheet name" })
    .option("filterTags", { description: "Comma separated tags, that must be present for keys from worksheet. Key will be taken from worksheet if at least one tag is matched." })
    .demandOption(["outputPath", "outputType", "document"]).argv;
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var importer, documents, sheets, tags, i, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importer = new google_sheet_importer_1.GoogleSheetImporter();
                    importer.outputPath = argv["outputPath"];
                    importer.outputType = argv["outputType"];
                    importer.defaultLocale = argv["defaultLocale"];
                    documents = Array.isArray(argv["document"]) ? argv["document"] : [argv["document"]];
                    sheets = Array.isArray(argv["worksheet"]) ? argv["worksheet"] : [argv["worksheet"]];
                    tags = Array.isArray(argv["filterTags"]) ? argv["filterTags"] : [argv["filterTags"]];
                    for (i = 0; i < documents.length; i++) {
                        importer.addDocument(documents[i], sheets.length > i ? sheets[i] : undefined, tags.length > i ? (tags[i] ? tags[i].split(",") : undefined) : undefined);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, importer.generate()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=google-sheet-importer-cli.js.map