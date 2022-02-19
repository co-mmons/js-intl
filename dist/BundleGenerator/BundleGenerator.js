"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlBundleGenerator = exports.IntlBundleItem = void 0;
const fsextra = require("fs-extra");
const fs_extra_1 = require("fs-extra");
const path = require("path");
class IntlPolyfillBundleItem {
    constructor(path) {
        this.path = path;
    }
}
class IntlRelativeTimePolyfillBundleItem {
    constructor(path) {
        this.path = path;
    }
}
var IntlBundleItem;
(function (IntlBundleItem) {
    function intlPolyfill(node_modules = "node_modules") {
        return new IntlPolyfillBundleItem(`${node_modules}/intl/locale-data/jsonp/{{LOCALE}}.js`);
    }
    IntlBundleItem.intlPolyfill = intlPolyfill;
    function intlRelativeTimePolyfill(node_modules = "node_modules") {
        return new IntlRelativeTimePolyfillBundleItem(`${node_modules}/@formatjs/intl-relativetimeformat/dist/locale-data/{{LOCALE}}.js`);
    }
    IntlBundleItem.intlRelativeTimePolyfill = intlRelativeTimePolyfill;
})(IntlBundleItem = exports.IntlBundleItem || (exports.IntlBundleItem = {}));
class IntlBundleGenerator {
    constructor(locales, inputs, outputFile, options) {
        this.locales = locales;
        this.outputFile = outputFile;
        this.options = options;
        if (this.options && this.options.nodeModulesPath) {
            this.nodeModulesPath = this.options.nodeModulesPath;
        }
        this.items = [];
        INPUTS: for (const input of inputs) {
            if (typeof input === "string") {
                if (input === "intl" || input === "@formatjs/intl-relativetimeformat") {
                    for (const nodeModulesPath of this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths) {
                        if ((0, fs_extra_1.existsSync)(path.resolve(nodeModulesPath, input))) {
                            if (input === "intl") {
                                this.items.push(IntlBundleItem.intlPolyfill(path.resolve(nodeModulesPath)));
                            }
                            else {
                                this.items.push(IntlBundleItem.intlRelativeTimePolyfill(path.resolve(nodeModulesPath)));
                            }
                            continue INPUTS;
                        }
                    }
                }
                const segments = input.split("/");
                for (const nodeModulesPath of this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths) {
                    if ((0, fs_extra_1.existsSync)(nodeModulesPath)) {
                        for (let i = segments.length; i >= 1; i--) {
                            const dirPath = path.resolve(nodeModulesPath, segments.slice(0, i).join("/"));
                            const packagePath = path.resolve(dirPath, "package.json");
                            if ((0, fs_extra_1.existsSync)(packagePath)) {
                                const pckg = (0, fs_extra_1.readJsonSync)(packagePath);
                                if (pckg["intlBundleItems"] && Array.isArray(pckg["intlBundleItems"])) {
                                    for (const item of pckg["intlBundleItems"]) {
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
            }
            else {
                this.items.push(input);
            }
        }
    }
    generate() {
        let jsType = this.outputFile.endsWith(".js");
        let jsonType = this.outputFile.endsWith(".json");
        //let tsType = this.outputFile.endsWith(".ts");
        for (let baseLocale of this.locales) {
            let contents = [];
            let values;
            // whether intl polyfill locale data is in the bundle
            let intlPolyfill = false;
            let intlRelativeTimePolyfill = false;
            let outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);
            for (let locale of this.extractLocales(baseLocale)) {
                let segments = locale.split(/(\-|\_)/g);
                let dashed = segments.join("-");
                let underscored = segments.join("_");
                for (let item of this.items) {
                    const resolveItemPath = (itemPath) => {
                        let p = path.resolve(itemPath.replace("{{LOCALE}}", dashed));
                        if (!fsextra.existsSync(itemPath)) {
                            p = path.resolve(itemPath.replace("{{LOCALE}}", underscored));
                        }
                        if (fsextra.existsSync(p)) {
                            return p;
                        }
                    };
                    let itemPath;
                    if (item.path.startsWith("{{NODE_MODULES}}")) {
                        for (const nodeModulesPath of this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths) {
                            itemPath = resolveItemPath(item.path.replace("{{NODE_MODULES}}", nodeModulesPath));
                            if (itemPath) {
                                break;
                            }
                        }
                    }
                    else {
                        itemPath = resolveItemPath(item.path);
                    }
                    if (itemPath) {
                        if (item.type == "message" || item.type === "value") {
                            if (!values) {
                                values = {};
                            }
                            if (!values[item.namespace]) {
                                values[item.namespace] = {};
                            }
                            if (!values[item.namespace][baseLocale]) {
                                values[item.namespace][baseLocale] = {};
                            }
                            let json = fsextra.readJsonSync(itemPath);
                            // we must look for resources and copy resources into output directory
                            for (let key in json) {
                                if (typeof json[key] != "string" && json[key]["file"]) {
                                    fsextra.copyFileSync(path.resolve(path.dirname(itemPath), json[key]["file"]), path.resolve(path.dirname(outputFile), json[key]["file"] = `${item.namespace}-${json[key]["file"]}`.replace(/[^(\w|\d|\.|\@|\_|\-|\,|\$)]/, "-")));
                                }
                            }
                            Object.assign(values[item.namespace][baseLocale], json);
                        }
                        else {
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
            if (values) {
                if (jsType) {
                    contents.push("{var INTL_VALUES;");
                    contents.push("if(typeof window !== 'undefined'){INTL_VALUES=window['INTL_VALUES']=(window['INTL_VALUES']||{});}");
                    contents.push("if(typeof global !== 'undefined'){INTL_VALUES=global['INTL_VALUES']=(global['INTL_VALUES']||{});}");
                    contents.push("var values = " + JSON.stringify(values) + ";");
                    contents.push("for (var key0 in values) { INTL_VALUES[key0] = {}; for (var key1 in (values[key0] || {})) { INTL_VALUES[key0][key1] = values[key0][key1]; }}");
                    contents.push("}");
                }
                else if (jsonType) {
                    contents.push(JSON.stringify(values));
                }
            }
            if (intlPolyfill) {
                contents.unshift("{var INTL_POLYFILL=[];", "if(typeof window !== 'undefined'){INTL_POLYFILL=window['INTL_POLYFILL']=(window['INTL_POLYFILL']||[]);}", "if(typeof global !== 'undefined'){INTL_POLYFILL=global['INTL_POLYFILL']=(global['INTL_POLYFILL']||[]);}", "}");
            }
            if (intlRelativeTimePolyfill) {
                contents.unshift("{var INTL_RELATIVE_POLYFILL=[];", "if(typeof window !== 'undefined'){INTL_RELATIVE_POLYFILL=window['INTL_RELATIVE_POLYFILL']=(window['INTL_RELATIVE_POLYFILL']||[]);}", "if(typeof global !== 'undefined'){INTL_RELATIVE_POLYFILL=global['INTL_RELATIVE_POLYFILL']=(global['INTL_RELATIVE_POLYFILL']||[]);}", "}");
            }
            fsextra.writeFileSync(outputFile, contents.join("\n"));
        }
    }
    extractLocales(locale) {
        let locales = [];
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
exports.IntlBundleGenerator = IntlBundleGenerator;
//# sourceMappingURL=BundleGenerator.js.map