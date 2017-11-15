import * as yargs from "yargs";

import {GoogleSheetImporter} from "./google-sheet-importer";

const argv = yargs
    .option("outputPath", {description: "Output directory path"})
    .option("outputType", {description: "Output type", choices: ["json", "ts"]})
    .option("document", {description: "Google document identifier"})
    .option("worksheet", {description: "Document's worksheet index (1 based) or worksheet name"})
    // .option("appId", {description: "Identyfikator aplikacji"})
    // .option("deployment", {description: "Z którego środowiska backendowego korzystamy", choices: ["development", "production"]})
    // .option("deploymentStorage", {description: "Z którego środowiska storage korzystamy", choices: ["development", "production"]})
    .demandOption(["outputPath", "outputType"]).argv;

async function main() {

    let importer = new GoogleSheetImporter();
    importer.outputPath = argv["outputPath"];
    importer.outputType = argv["outputType"];

    let documents: string[] = Array.isArray(argv["document"]) ? argv["document"] : [argv["document"]];
    let sheets = Array.isArray(argv["worksheet"]) ? argv["worksheet"] : [argv["worksheet"]];
    let tags = Array.isArray(argv["filterTags"]) ? argv["filterTags"] : [argv["filterTags"]];

    for (let i = 0; i < documents.length; i++) {
        importer.addDocument(documents[i], sheets.length > i ? sheets[i] : undefined, tags.length > i ? (tags[i] ? tags[i].split(",") : undefined) : undefined);
    }

    await importer.generate();
}

main();