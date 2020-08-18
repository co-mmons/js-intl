import * as yargs from "yargs";

import {GoogleSheetImporter} from "./GoogleSheetImporter";

const argv = yargs
    .option("outputPath", {description: "Output directory path", type: "string"})
    .option("outputType", {description: "Output type", choices: ["json", "ts"], type: "string"})
    .option("defaultLocale", {description: "Default locale to use, when no translation for some other locale", "type": "string"})
    .option("document", {description: "Google document identifier", type: "string"})
    .option("worksheet", {description: "Document's worksheet index (1 based) or worksheet name", type: "string"})
    .option("filterTags", {description: "Comma separated tags, that must be present for keys from worksheet. Key will be taken from worksheet if at least one tag is matched."})
    .demandOption(["outputPath", "outputType", "document"]).argv;

(async () => {

    let importer = new GoogleSheetImporter();
    importer.outputPath = argv["outputPath"];
    importer.outputType = argv["outputType"] as any;
    importer.defaultLocale = argv["defaultLocale"];

    let documents: string[] = Array.isArray(argv["document"]) ? argv["document"] : [argv["document"]];
    let sheets = Array.isArray(argv["worksheet"]) ? argv["worksheet"] : [argv["worksheet"]];
    let tags = Array.isArray(argv["filterTags"]) ? argv["filterTags"] : [argv["filterTags"]];

    for (let i = 0; i < documents.length; i++) {
        importer.addDocument(documents[i], sheets.length > i ? sheets[i] : undefined, tags.length > i ? (tags[i] ? tags[i].split(",") : undefined) : undefined);
    }
    try {
        await importer.generate();
    } catch (error) {
        console.error(error);
    }
})();
