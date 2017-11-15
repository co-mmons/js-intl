import * as fsextra from "fs-extra";
import * as path from "path";

export interface IntlBundleItem {
    type?: "message" | null | undefined,
    namespace?: string,
    path: string
}

export class IntlBundleGenerator {

    constructor(private locales: string[], private input: IntlBundleItem[], private outputFile: string) {
    }

    public generate() {
        
        for (let baseLocale of this.locales) {

            let contents: string[] = [];
            let messages: any;

            for (let locale of this.extractLocales(baseLocale)) {

                for (let item of this.input) {

                    let itemPath = path.resolve(item.path.replace("{{LOCALE}}", locale));

                    if (fsextra.existsSync(itemPath)) {
                        if (item.type == "message") {

                            if (!messages) {
                                messages = {};
                            }

                            if (!messages[item.namespace]) {
                                messages[item.namespace] = {};
                            }

                            if (!messages[item.namespace][baseLocale]) {
                                messages[item.namespace][baseLocale] = {};
                            }
                            
                            Object.assign(messages[item.namespace][baseLocale], fsextra.readJsonSync(itemPath));
                            
                        } else {
                            let c = fsextra.readFileSync(itemPath).toString();
                            if (contents.indexOf(c) < 0) {
                                contents.push(c);
                            }
                        }
                    }
                }
            }

            let outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);

            if (messages) {
                contents.push("{var INTL_MESSAGES;");
                contents.push("if(typeof window !== 'undefined'){INTL_MESSAGES=window['INTL_MESSAGES']=(window['INTL_MESSAGES']||{});}");
                contents.push("if(typeof global !== 'undefined'){INTL_MESSAGES=global['INTL_MESSAGES']=(global['INTL_MESSAGES']||{});}");
                contents.push("Object.assign(INTL_MESSAGES, " + JSON.stringify(messages) + ");");
                contents.push("}");
            }

            fsextra.writeFileSync(outputFile, contents.join("\n"));
        }
    }

    private extractLocales(locale: string) {

        let locales: string[] = [];

        let segments = locale.split("-");

        for (let i = 0; i < segments.length; i++) {
            let hyphen = segments.slice(0, i + 1).join("-");
            let underscore = segments.slice(0, i + 1).join("_");
            
            if (locales.indexOf(hyphen) < 0) {
                locales.push(hyphen);
            }

            if (locales.indexOf(underscore) < 0) {
                locales.push(underscore);
            }
        }

        return locales;
    }
}