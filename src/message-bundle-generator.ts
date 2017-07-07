import * as fsextra from "fs-extra";
import * as path from "path";

export class IntlMessageBundleGenerator {

    constructor(private locales: string[], private input: {[namespace: string]: string}, private outputFile: string) {
    }

    public generate() {

        for (let baseLocale of this.locales) {

            let outputMap: {[key: string]: string} = {};

            for (let locale of this.extractLocales(baseLocale)) {

                for (let namespace in this.input) {

                    let inputPath = path.resolve(this.input[namespace].replace("{{LOCALE}}", locale));

                    if (fsextra.existsSync(inputPath)) {
                        Object.assign(outputMap, fsextra.readJsonSync(inputPath));
                    }
                }
            }

            let outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);

            let contents = "{var INTL_MESSAGES;";
            contents += "if(window){INTL_MESSAGES=window.INTL_MESSAGES=(window.INTL_MESSAGES||{});}";
            contents += "if(global){INTL_MESSAGES=global.INTL_MESSAGES=(global.INTL_MESSAGES||{});}";
            contents += "Object.assign(INTL_MESSAGES, " + JSON.stringify(outputMap) + ");";
            contents += "}";

            fsextra.writeFileSync(outputFile, contents);
        }
    }

    private extractLocales(locale: string) {

        let locales: string[] = [];

        let segments = locale.split("-");

        for (let i = 0; i < segments.length; i++) {
            locales.push(segments.slice(0, i + 1).join("-"));
            locales.push(segments.slice(0, i + 1).join("_"));
        }

        return locales;
    }
}