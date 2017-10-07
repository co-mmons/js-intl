"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsextra = require("fs-extra");
var path = require("path");
var IntlBundleGenerator = (function () {
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
            for (var _b = 0, _c = this.extractLocales(baseLocale); _b < _c.length; _b++) {
                var locale = _c[_b];
                for (var _d = 0, _e = this.input; _d < _e.length; _d++) {
                    var item = _e[_d];
                    var itemPath = path.resolve(item.path.replace("{{LOCALE}}", locale));
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
            var outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
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
    };
    IntlBundleGenerator.prototype.extractLocales = function (locale) {
        var locales = [];
        var segments = locale.split("-");
        for (var i = 0; i < segments.length; i++) {
            var hyphen = segments.slice(0, i + 1).join("-");
            var underscore = segments.slice(0, i + 1).join("_");
            if (locales.indexOf(hyphen) < 0) {
                locales.push(hyphen);
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