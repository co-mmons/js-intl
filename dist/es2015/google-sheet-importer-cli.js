#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs = require("yargs");
const google_sheet_importer_1 = require("./google-sheet-importer");
const argv = yargs
    .option("outputPath", { description: "Output directory path" })
    .option("outputType", { description: "Output type", choices: ["json", "ts"] })
    .option("defaultLocale", { description: "Default locale to use, when no translation for some other locale" })
    .option("document", { description: "Google document identifier" })
    .option("worksheet", { description: "Document's worksheet index (1 based) or worksheet name" })
    .option("filterTags", { description: "Comma separated tags, that must be present for keys from worksheet. Key will be taken from worksheet if at least one tag is matched." })
    .demandOption(["outputPath", "outputType", "document"]).argv;
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let importer = new google_sheet_importer_1.GoogleSheetImporter();
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
            yield importer.generate();
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
//# sourceMappingURL=google-sheet-importer-cli.js.map