"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsextra = require("fs-extra");
var path = require("path");
var IntlMessageBundleGenerator = (function () {
    function IntlMessageBundleGenerator(locales, input, outputFile) {
        this.locales = locales;
        this.input = input;
        this.outputFile = outputFile;
    }
    IntlMessageBundleGenerator.prototype.generate = function () {
        for (var _i = 0, _a = this.locales; _i < _a.length; _i++) {
            var baseLocale = _a[_i];
            var outputMap = {};
            for (var _b = 0, _c = this.extractLocales(baseLocale); _b < _c.length; _b++) {
                var locale = _c[_b];
                for (var namespace in this.input) {
                    var inputPath = path.resolve(this.input[namespace].replace("{{LOCALE}}", locale));
                    if (fsextra.existsSync(inputPath)) {
                        Object.assign(outputMap, fsextra.readJsonSync(inputPath));
                    }
                }
            }
            var outputFile = path.resolve(this.outputFile.replace("{{LOCALE}}", baseLocale));
            fsextra.ensureFileSync(outputFile);
            var contents = "{var INTL_MESSAGES;";
            contents += "if(window){INTL_MESSAGES=window.INTL_MESSAGES=(window.INTL_MESSAGES||{});}";
            contents += "if(global){INTL_MESSAGES=global.INTL_MESSAGES=(global.INTL_MESSAGES||{});}";
            contents += "Object.assign(INTL_MESSAGES, " + JSON.stringify(outputMap) + ");";
            contents += "}";
            fsextra.writeFileSync(outputFile, contents);
        }
    };
    IntlMessageBundleGenerator.prototype.extractLocales = function (locale) {
        var locales = [];
        var segments = locale.split("-");
        for (var i = 0; i < segments.length; i++) {
            locales.push(segments.slice(0, i + 1).join("-"));
            locales.push(segments.slice(0, i + 1).join("_"));
        }
        return locales;
    };
    return IntlMessageBundleGenerator;
}());
exports.IntlMessageBundleGenerator = IntlMessageBundleGenerator;
//# sourceMappingURL=message-bundle-generator.js.map