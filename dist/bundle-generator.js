"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsextra = require("fs-extra");
var path = require("path");
var IntlBundleGenerator = /** @class */ (function () {
    function IntlBundleGenerator(locales, input, outputFile) {
        this.locales = locales;
        this.input = input;
        this.outputFile = outputFile;
    }
    IntlBundleGenerator.prototype.generate = function () {
        for (var _i = 0, _a = this.locales; _i < _a.length; _i++) {
            var baseLocale = _a[_i];
            var contents = [];
            var messages = void 0;
            var outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);
            for (var _b = 0, _c = this.extractLocales(baseLocale); _b < _c.length; _b++) {
                var locale = _c[_b];
                var segments = locale.split(/(\-|\_)/g);
                var dashed = segments.join("-");
                var underscored = segments.join("_");
                for (var _d = 0, _e = this.input; _d < _e.length; _d++) {
                    var item = _e[_d];
                    var itemPath = path.resolve(item.path.replace("{{LOCALE}}", dashed));
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
                            if (contents.indexOf(c) < 0) {
                                contents.push(c);
                            }
                        }
                    }
                }
            }
            if (messages) {
                contents.push("{var INTL_MESSAGES;");
                contents.push("if(typeof window !== 'undefined'){INTL_MESSAGES=window['INTL_MESSAGES']=(window['INTL_MESSAGES']||{});}");
                contents.push("if(typeof global !== 'undefined'){INTL_MESSAGES=global['INTL_MESSAGES']=(global['INTL_MESSAGES']||{});}");
                contents.push("Object.assign(INTL_MESSAGES, " + JSON.stringify(messages) + ");");
                contents.push("}");
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