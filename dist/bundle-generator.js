"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var fsextra = require("fs-extra");
var path = require("path");
var IntlPolyfillBundleItem = /** @class */ (function () {
    function IntlPolyfillBundleItem(path) {
        this.path = path;
    }
    return IntlPolyfillBundleItem;
}());
var IntlRelativeTimePolyfillBundleItem = /** @class */ (function () {
    function IntlRelativeTimePolyfillBundleItem(path) {
        this.path = path;
    }
    return IntlRelativeTimePolyfillBundleItem;
}());
var IntlBundleItem;
(function (IntlBundleItem) {
    function intlPolyfill(node_modules) {
        if (node_modules === void 0) { node_modules = "node_modules"; }
        return new IntlPolyfillBundleItem(node_modules + "/intl/locale-data/jsonp/{{LOCALE}}.js");
    }
    IntlBundleItem.intlPolyfill = intlPolyfill;
    function intlRelativeTimePolyfill(node_modules) {
        if (node_modules === void 0) { node_modules = "node_modules"; }
        return new IntlRelativeTimePolyfillBundleItem(node_modules + "/@formatjs/intl-relativetimeformat/dist/locale-data/{{LOCALE}}.js");
    }
    IntlBundleItem.intlRelativeTimePolyfill = intlRelativeTimePolyfill;
})(IntlBundleItem = exports.IntlBundleItem || (exports.IntlBundleItem = {}));
var IntlBundleGenerator = /** @class */ (function () {
    function IntlBundleGenerator(locales, inputs, outputFile, options) {
        this.locales = locales;
        this.outputFile = outputFile;
        this.options = options;
        if (this.options && this.options.nodeModulesPath) {
            this.nodeModulesPath = this.options.nodeModulesPath;
        }
        this.items = [];
        INPUTS: for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            if (typeof input === "string") {
                if (input === "intl" || input === "@formatjs/intl-relativetimeformat") {
                    for (var _a = 0, _b = this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths; _a < _b.length; _a++) {
                        var nodeModulesPath = _b[_a];
                        if (fs_extra_1.existsSync(path.resolve(nodeModulesPath, input))) {
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
                var segments = input.split("/");
                for (var _c = 0, _d = this.nodeModulesPath ? [this.nodeModulesPath] : require.main.paths; _c < _d.length; _c++) {
                    var nodeModulesPath = _d[_c];
                    if (fs_extra_1.existsSync(nodeModulesPath)) {
                        for (var i = segments.length; i >= 1; i--) {
                            var dirPath = path.resolve(nodeModulesPath, segments.slice(0, i).join("/"));
                            var packagePath = path.resolve(dirPath, "package.json");
                            if (fs_extra_1.existsSync(packagePath)) {
                                var pckg = fs_extra_1.readJsonSync(packagePath);
                                if (pckg["intlBundleItems"] && Array.isArray(pckg["intlBundleItems"])) {
                                    for (var _e = 0, _f = pckg["intlBundleItems"]; _e < _f.length; _e++) {
                                        var item = _f[_e];
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
    IntlBundleGenerator.prototype.generate = function () {
        var jsType = this.outputFile.endsWith(".js");
        var jsonType = this.outputFile.endsWith(".json");
        //let tsType = this.outputFile.endsWith(".ts");
        for (var _i = 0, _a = this.locales; _i < _a.length; _i++) {
            var baseLocale = _a[_i];
            var contents = [];
            var messages = void 0;
            // whether intl polyfill locale data is in the bundle
            var intlPolyfill = false;
            var intlRelativeTimePolyfill = false;
            var outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);
            var _loop_1 = function (locale) {
                var segments = locale.split(/(\-|\_)/g);
                var dashed = segments.join("-");
                var underscored = segments.join("_");
                for (var _i = 0, _a = this_1.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var resolveItemPath = function (itemPath) {
                        var p = path.resolve(itemPath.replace("{{LOCALE}}", dashed));
                        if (!fsextra.existsSync(itemPath)) {
                            p = path.resolve(itemPath.replace("{{LOCALE}}", underscored));
                        }
                        if (fsextra.existsSync(p)) {
                            return p;
                        }
                    };
                    var itemPath = void 0;
                    if (item.path.startsWith("{{NODE_MODULES}}")) {
                        for (var _b = 0, _c = this_1.nodeModulesPath ? [this_1.nodeModulesPath] : require.main.paths; _b < _c.length; _b++) {
                            var nodeModulesPath = _c[_b];
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
                            var json = fsextra.readJsonSync(itemPath);
                            // we must look for resources and copy resources into output directory
                            for (var key in json) {
                                if (typeof json[key] != "string" && json[key]["file"]) {
                                    fsextra.copyFileSync(path.resolve(path.dirname(itemPath), json[key]["file"]), path.resolve(path.dirname(outputFile), json[key]["file"] = (item.namespace + "-" + json[key]["file"]).replace(/[^(\w|\d|\.|\@|\_|\-|\,|\$)]/, "-")));
                                }
                            }
                            Object.assign(messages[item.namespace][baseLocale], json);
                        }
                        else {
                            var c = fsextra.readFileSync(itemPath).toString();
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
            };
            var this_1 = this;
            for (var _b = 0, _c = this.extractLocales(baseLocale); _b < _c.length; _b++) {
                var locale = _c[_b];
                _loop_1(locale);
            }
            if (messages) {
                if (jsType) {
                    contents.push("{var INTL_MESSAGES;");
                    contents.push("if(typeof window !== 'undefined'){INTL_MESSAGES=window['INTL_MESSAGES']=(window['INTL_MESSAGES']||{});}");
                    contents.push("if(typeof global !== 'undefined'){INTL_MESSAGES=global['INTL_MESSAGES']=(global['INTL_MESSAGES']||{});}");
                    contents.push("var messages = " + JSON.stringify(messages) + ";");
                    contents.push("for (var key0 in messages) { INTL_MESSAGES[key0] = {}; for (var key1 in (messages[key0] || {})) { INTL_MESSAGES[key0][key1] = messages[key0][key1]; }}");
                    contents.push("}");
                }
                else if (jsonType) {
                    contents.push(JSON.stringify(messages));
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
    };
    IntlBundleGenerator.prototype.extractLocales = function (locale) {
        var locales = [];
        var segments = locale.split("-");
        for (var i = 0; i < segments.length; i++) {
            var dash = segments.slice(0, i + 1).join("-");
            var underscore = segments.slice(0, i + 1).join("_");
            if (locales.indexOf(dash) < 0) {
                locales.push(dash);
            }
            if (locales.indexOf(underscore) < 0) {
                locales.push(underscore);
            }
        }
        return locales;
    };
    return IntlBundleGenerator;
}());
exports.IntlBundleGenerator = IntlBundleGenerator;
//# sourceMappingURL=bundle-generator.js.map