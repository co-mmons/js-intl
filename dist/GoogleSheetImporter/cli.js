#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const yargs = require("yargs");
const GoogleSheetImporter_1 = require("./GoogleSheetImporter");
const argv = yargs
    .option("outputPath", { description: "Output directory path", type: "string" })
    .option("outputType", { description: "Output type", choices: ["json", "ts"], type: "string" })
    .option("defaultLocale", { description: "Default locale to use, when no translation for some other locale", "type": "string" })
    .option("document", { description: "Google document identifier", type: "string" })
    .option("worksheet", { description: "Document's worksheet index (1 based) or worksheet name", type: "string" })
    .option("filterTags", { description: "Comma separated tags, that must be present for keys from worksheet. Key will be taken from worksheet if at least one tag is matched." })
    .demandOption(["outputPath", "outputType", "document"]).argv;
(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const importer = new GoogleSheetImporter_1.GoogleSheetImporter();
    importer.outputPath = argv["outputPath"];
    importer.outputType = argv["outputType"];
    importer.defaultLocale = argv["defaultLocale"];
    const documents = Array.isArray(argv["document"]) ? argv["document"] : [argv["document"]];
    const sheets = Array.isArray(argv["worksheet"]) ? argv["worksheet"] : [argv["worksheet"]];
    const tags = Array.isArray(argv["filterTags"]) ? argv["filterTags"] : [argv["filterTags"]];
    for (let i = 0; i < documents.length; i++) {
        importer.addDocument(documents[i], sheets.length > i ? sheets[i] : undefined, tags.length > i ? (tags[i] ? tags[i].split(",") : undefined) : undefined);
    }
    try {
        yield importer.generate();
    }
    catch (error) {
        console.error(error);
    }
}))();
//# sourceMappingURL=cli.js.map