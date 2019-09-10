import * as fsextra from "fs-extra";
import * as path from "path";

export interface IntlBundleItem {
    type?: "message" | null | undefined,
    namespace?: string,
    path: string
}

export namespace IntlBundleItem {

    export const intlPolyfill: IntlBundleItem = {path: "node_modules/intl/locale-data/jsonp/{{LOCALE}}.js"};

    export const intlRelativeTimePolyfill: IntlBundleItem = {path: "node_modules/@formatjs/intl-relativetimeformat/dist/locale-data/{{LOCALE}}.js"};

}

export class IntlBundleGenerator {

    constructor(private locales: string[], private input: IntlBundleItem[], private outputFile: string) {
    }

    public generate() {

        let jsType = this.outputFile.endsWith(".js");
        let jsonType = this.outputFile.endsWith(".json");
        //let tsType = this.outputFile.endsWith(".ts");
        
        for (let baseLocale of this.locales) {

            let contents: string[] = [];
            let messages: any;

            // whether intl polyfill locale data is in the bundle
            let intlPolyfill: boolean = false;

            let intlRelativeTimePolyfill: boolean = false;

            let outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);

            for (let locale of this.extractLocales(baseLocale)) {

                let segments = locale.split(/(\-|\_)/g);
                let dashed = segments.join("-");
                let underscored = segments.join("_");

                for (let item of this.input) {

                    let itemPath = path.resolve(item.path.replace("{{LOCALE}}", dashed));
                    
                    if (!fsextra.existsSync(itemPath)) {
                        itemPath = path.resolve(item.path.replace("{{LOCALE}}", underscored));
                    }

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

                            let json = fsextra.readJsonSync(itemPath);

                            // we must look for resources and copy resources into output directory
                            for (let key in json) {
                                if (typeof json[key] != "string" && json[key]["file"]) {
                                    fsextra.copyFileSync(path.resolve(path.dirname(itemPath), json[key]["file"]), path.resolve(path.dirname(outputFile), json[key]["file"] = `${item.namespace}-${json[key]["file"]}`.replace(/[^(\w|\d|\.|\@|\_|\-|\,|\$)]/, "-")));
                                }
                            }
                            
                            Object.assign(messages[item.namespace][baseLocale], json);
                            
                        } else {
                            let c = fsextra.readFileSync(itemPath).toString();

                            if (item === IntlBundleItem.intlPolyfill) {
                                intlPolyfill = true;
                                c = c.replace("IntlPolyfill.__addLocaleData", "INTL_POLYFILL.push");
                            }

                            if (item === IntlBundleItem.intlRelativeTimePolyfill) {
                                intlRelativeTimePolyfill = true;
                                c = c.replace(/Intl\.RelativeTimeFormat\.__addLocaleData/gm, "INTL_RELATIVE_POLYFILL.push");
                                c = c.replace(/Intl\.RelativeTimeFormat/gm, "INTL_RELATIVE_POLYFILL");
                            }

                            if (contents.indexOf(c) < 0) {
                                contents.push(c);
                            }
                        }
                    }
                }
            }

            if (messages) {
                if (jsType) {
                    contents.push("{var INTL_MESSAGES;");
                    contents.push("if(typeof window !== 'undefined'){INTL_MESSAGES=window['INTL_MESSAGES']=(window['INTL_MESSAGES']||{});}");
                    contents.push("if(typeof global !== 'undefined'){INTL_MESSAGES=global['INTL_MESSAGES']=(global['INTL_MESSAGES']||{});}");
                    contents.push("var messages = " + JSON.stringify(messages) + ";");
                    contents.push("for (var key0 in messages) { INTL_MESSAGES[key0] = {}; for (var key1 in (messages[key0] || {})) { INTL_MESSAGES[key0][key1] = messages[key0][key1]; }}");
                    contents.push("}");

                } else if (jsonType) {
                    contents.push(JSON.stringify(messages));
                }
            }

            if (intlPolyfill) {
                contents.unshift(
                    "{var INTL_POLYFILL=[];",
                    "if(typeof window !== 'undefined'){INTL_POLYFILL=window['INTL_POLYFILL']=(window['INTL_POLYFILL']||{});}",
                    "if(typeof global !== 'undefined'){INTL_POLYFILL=global['INTL_POLYFILL']=(global['INTL_POLYFILL']||{});}",
                    "}"
                );
            }

            if (intlRelativeTimePolyfill) {
                contents.unshift(
                    "{var INTL_RELATIVE_POLYFILL=[];",
                    "if(typeof window !== 'undefined'){INTL_RELATIVE_POLYFILL=window['INTL_RELATIVE_POLYFILL']=(window['INTL_RELATIVE_POLYFILL']||{});}",
                    "if(typeof global !== 'undefined'){INTL_RELATIVE_POLYFILL=global['INTL_RELATIVE_POLYFILL']=(global['INTL_RELATIVE_POLYFILL']||{});}",
                    "}"
                );
            }

            fsextra.writeFileSync(outputFile, contents.join("\n"));
        }
    }

    private extractLocales(locale: string) {

        let locales: string[] = [];

        let segments = locale.split("-");

        for (let i = 0; i < segments.length; i++) {
            let dash = segments.slice(0, i + 1).join("-");
            let underscore = segments.slice(0, i + 1).join("_");
            
            if (locales.indexOf(dash) < 0) {
                locales.push(dash);
            }

            if (locales.indexOf(underscore) < 0) {
                locales.push(underscore);
            }
        }

        return locales;
    }
}
