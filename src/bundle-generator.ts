import {readJsonSync, existsSync} from "fs-extra";
import * as fsextra from "fs-extra";
import * as path from "path";

export interface IntlBundleItem {
    type?: "message" | null | undefined,
    namespace?: string,
    path: string,
    module?: string
}

class IntlPolyfillBundleItem implements IntlBundleItem {
    constructor(public path: string) {
    }
}

class IntlRelativeTimePolyfillBundleItem implements IntlBundleItem {
    constructor(public path: string) {
    }
}

export namespace IntlBundleItem {

    export function intlPolyfill(node_modules: string = "node_modules"): IntlBundleItem {
        return new IntlPolyfillBundleItem(`${node_modules}/intl/locale-data/jsonp/{{LOCALE}}.js`);
    }

    export function intlRelativeTimePolyfill(node_modules: string = "node_modules"): IntlBundleItem {
        return new IntlRelativeTimePolyfillBundleItem(`${node_modules}/@formatjs/intl-relativetimeformat/dist/locale-data/{{LOCALE}}.js`);
    }

}

export class IntlBundleGenerator {

    constructor(private locales: string[], inputs: Array<IntlBundleItem | string>, private outputFile: string, private options?: {nodeModulesPath?: string}) {

        if (this.options && this.options.nodeModulesPath) {
            this.nodeModulesPath = this.options.nodeModulesPath;
        }

        this.items = [];
        INPUTS: for (const input of inputs) {

            if (typeof input === "string") {

                if (input === "intl" || input === "@formatjs/intl-relativetimeformat") {

                    for (const nodeModulesPath of this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths) {
                        if (existsSync(path.resolve(nodeModulesPath, input))) {

                            if (input === "intl") {
                                this.items.push(IntlBundleItem.intlPolyfill(path.resolve(nodeModulesPath)));
                            } else {
                                this.items.push(IntlBundleItem.intlRelativeTimePolyfill(path.resolve(nodeModulesPath)));
                            }

                            continue INPUTS;
                        }
                    }
                }

                const segments = input.split("/");

                for (const nodeModulesPath of this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths) {

                    if (existsSync(nodeModulesPath)) {

                        for (let i = segments.length; i >= 1; i--) {
                            const dirPath = path.resolve(nodeModulesPath, segments.slice(0, i).join("/"));
                            const packagePath = path.resolve(dirPath, "package.json");

                            if (existsSync(packagePath)) {
                                const pckg = readJsonSync(packagePath);

                                if (pckg["intlBundleItems"] && Array.isArray(pckg["intlBundleItems"])) {

                                    for (const item of pckg["intlBundleItems"] as IntlBundleItem[]) {

                                        if (typeof item === "object" && item.type && item.path) {

                                            if (item.module === input || (!item.module && pckg.name === input)) {

                                                if (!item.path.startsWith("/") && !item.path.startsWith("{{NODE_MODULES}}")) {
                                                    item.path = path.resolve(dirPath, item.path);
                                                }

                                                if (!item.namespace) {
                                                    item.namespace = item.module || pckg.name;
                                                }

                                                this.items.push(item);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            } else {
                this.items.push(input);
            }
        }
    }

    private readonly items: IntlBundleItem[];

    private readonly nodeModulesPath: string;

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

                for (let item of this.items) {

                    const resolveItemPath = (itemPath: string) => {

                        let p = path.resolve(itemPath.replace("{{LOCALE}}", dashed));

                        if (!fsextra.existsSync(itemPath)) {
                            p = path.resolve(itemPath.replace("{{LOCALE}}", underscored));
                        }

                        if (fsextra.existsSync(p)) {
                            return p;
                        }
                    }

                    let itemPath: string;

                    if (item.path.startsWith("{{NODE_MODULES}}")) {

                        for (const nodeModulesPath of this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths) {
                            itemPath = resolveItemPath(item.path.replace("{{NODE_MODULES}}", nodeModulesPath));
                            if (itemPath) {
                                break;
                            }
                        }

                    } else {
                        itemPath = resolveItemPath(item.path);
                    }

                    if (itemPath) {
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

                            if (item instanceof IntlPolyfillBundleItem) {
                                intlPolyfill = true;
                                c = c.replace("IntlPolyfill.__addLocaleData", "INTL_POLYFILL.push");
                            }

                            if (item instanceof IntlRelativeTimePolyfillBundleItem) {
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
                    "if(typeof window !== 'undefined'){INTL_POLYFILL=window['INTL_POLYFILL']=(window['INTL_POLYFILL']||[]);}",
                    "if(typeof global !== 'undefined'){INTL_POLYFILL=global['INTL_POLYFILL']=(global['INTL_POLYFILL']||[]);}",
                    "}"
                );
            }

            if (intlRelativeTimePolyfill) {
                contents.unshift(
                    "{var INTL_RELATIVE_POLYFILL=[];",
                    "if(typeof window !== 'undefined'){INTL_RELATIVE_POLYFILL=window['INTL_RELATIVE_POLYFILL']=(window['INTL_RELATIVE_POLYFILL']||[]);}",
                    "if(typeof global !== 'undefined'){INTL_RELATIVE_POLYFILL=global['INTL_RELATIVE_POLYFILL']=(global['INTL_RELATIVE_POLYFILL']||[]);}",
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
