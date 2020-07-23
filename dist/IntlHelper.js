"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlHelper = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@co.mmons/js-utils/core");
var bignumber_js_1 = require("bignumber.js");
var intl_messageformat_1 = require("intl-messageformat");
var Currency_1 = require("./Currency");
var DecimalFormatRef_1 = require("./DecimalFormatRef");
var MessageRef_1 = require("./MessageRef");
var messages_1 = require("./messages");
var Money_1 = require("./Money");
var selectUnit_1 = require("./selectUnit");
for (var _i = 0, _a = ["INTL_LOCALE", "INTL_SUPPORTED_LOCALE", "INT_DEFAULT_LOCALE", "INTL_POLYFILL", "INTL_RELATIVE_POLYFILL", "IntlPolyfill"]; _i < _a.length; _i++) {
    var v = _a[_i];
    if (typeof window !== "undefined" && !window[v]) {
        window[v] = undefined;
    }
    if (typeof global !== "undefined" && !global[v]) {
        global[v] = undefined;
    }
}
function loadPolyfillsLocale() {
    if (INTL_POLYFILL && INTL_POLYFILL.length && IntlPolyfill) {
        for (var _i = 0, INTL_POLYFILL_1 = INTL_POLYFILL; _i < INTL_POLYFILL_1.length; _i++) {
            var a = INTL_POLYFILL_1[_i];
            IntlPolyfill.__addLocaleData(a);
        }
        INTL_POLYFILL = [];
    }
    if (INTL_RELATIVE_POLYFILL && INTL_RELATIVE_POLYFILL.length && Intl["RelativeTimeFormat"] && Intl["RelativeTimeFormat"].__addLocaleData) {
        for (var _a = 0, INTL_RELATIVE_POLYFILL_1 = INTL_RELATIVE_POLYFILL; _a < INTL_RELATIVE_POLYFILL_1.length; _a++) {
            var a = INTL_RELATIVE_POLYFILL_1[_a];
            Intl["RelativeTimeFormat"].__addLocaleData(a);
        }
        INTL_RELATIVE_POLYFILL = [];
    }
}
loadPolyfillsLocale();
var defaultMessageFormat = new intl_messageformat_1.default("", "en");
var IntlHelper = /** @class */ (function () {
    function IntlHelper(defaultLocale, defaultNamespace) {
        this.defaultNamespace = defaultNamespace;
        this.useCache = true;
        this.namespaceAliases = {};
        this.formatters = {};
        this.formattersOptions = {};
        this.locale = defaultLocale;
        this.defaultNamespace = defaultNamespace;
        loadPolyfillsLocale();
    }
    IntlHelper.prototype.setResourcesLocation = function (location) {
        this.resourcesLocation = location;
    };
    IntlHelper.prototype.setDefaultNamespace = function (namespace) {
        this.defaultNamespace = namespace;
    };
    IntlHelper.prototype.addNamespaceAlias = function (namespace, alias) {
        this.namespaceAliases[alias] = namespace;
    };
    Object.defineProperty(IntlHelper.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (locale) {
            this._locale = locale || INTL_LOCALE || INTL_DEFAULT_LOCALE || "en-US";
            this._locales = [];
            var segments = this._locale.split("-");
            for (var i = 0; i < segments.length; i++) {
                this._locales.push(segments.slice(0, i + 1).join("-"));
            }
            this.formatters = {};
        },
        enumerable: false,
        configurable: true
    });
    IntlHelper.prototype.setLocale = function (locale) {
        this.locale = locale;
        return this;
    };
    Object.defineProperty(IntlHelper.prototype, "locales", {
        get: function () {
            if (this._locales) {
                return this._locales.slice();
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    IntlHelper.prototype.formatterInstance = function (formatterConstructor, id, constructorArguments) {
        var cacheKey = id ? formatterConstructor.name + "_" + id : getCacheId([formatterConstructor.name].concat(constructorArguments));
        var formatter = this.formatters[cacheKey];
        if (!formatter && constructorArguments) {
            if (formatterConstructor === intl_messageformat_1.default && !messages_1.isMessageNeedsFormatter(constructorArguments[0])) {
                formatter = defaultMessageFormat;
            }
            else if (formatterConstructor === Intl["RelativeTimeFormat"]) {
                formatter = new Intl["RelativeTimeFormat"](this._locales, constructorArguments[0]);
            }
            else if (formatterConstructor === Intl.DateTimeFormat) {
                formatter = new Intl.DateTimeFormat(this._locales, constructorArguments[0]);
            }
            else if (formatterConstructor === Intl.NumberFormat) {
                formatter = new Intl.NumberFormat(this._locales, constructorArguments[0]);
            }
            this.formatters[cacheKey] = formatter;
        }
        return formatter;
    };
    IntlHelper.prototype.formatterInstanceExists = function (formatter, id) {
        var formatterName = typeof formatter === "string" ? formatter : formatter.name;
        id = formatterName + "_" + id;
        return id in this.formatters[id];
    };
    IntlHelper.prototype.addFormatterPredefinedOptions = function (formatter, key, options) {
        var formatterName = typeof formatter === "string" ? formatter : formatter.name;
        if (!this.formattersOptions[formatterName]) {
            this.formattersOptions[formatterName] = {};
        }
        this.formattersOptions[formatterName][key] = options;
    };
    IntlHelper.prototype.addDateTimePredefinedOptions = function (key, options) {
        this.addFormatterPredefinedOptions(Intl.DateTimeFormat.name, key, options);
    };
    IntlHelper.prototype.findFormatterPredefinedOptions = function (formatter, key) {
        var formatterName = typeof formatter === "string" ? formatter : formatter.name;
        if (this.formattersOptions[formatterName]) {
            return this.formattersOptions[formatterName][key];
        }
        return undefined;
    };
    IntlHelper.prototype.value = function (value) {
        if (!value) {
            return;
        }
        for (var _i = 0, _a = this._locales; _i < _a.length; _i++) {
            var locale = _a[_i];
            if (value[locale]) {
                return value[locale];
            }
        }
    };
    IntlHelper.prototype.messagesImport = function (resourcePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, messages_1.importMessages(this.resourcesLocation + "/" + resourcePath + "/" + this.locale + ".json")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IntlHelper.prototype.messageFormat = function (message, values, formats) {
        return new intl_messageformat_1.default(message, this._locale, formats).format(values);
    };
    IntlHelper.prototype.message = function (key, values, formats) {
        var message = this.messageImpl(key, values, formats);
        if (typeof message === "string") {
            return message;
        }
        else if (message) {
            throw new Error("External message, use asyncMessage()");
        }
        else {
            return undefined;
        }
    };
    IntlHelper.prototype.asyncMessage = function (key, values, formats) {
        var message = this.messageImpl(key, values, formats);
        if (typeof message === "string") {
            return Promise.resolve(message);
        }
        else {
            return message;
        }
    };
    IntlHelper.prototype.messageImpl = function (key, values, formats) {
        var _this = this;
        var namespaceAndKey = messages_1.extractMessageNamespaceAndKey(key, this.defaultNamespace);
        if (!namespaceAndKey.namespace) {
            return namespaceAndKey.key;
        }
        if (key instanceof MessageRef_1.MessageRef) {
            if (!values) {
                values = key.values;
            }
            if (!formats) {
                formats = key.formats;
            }
        }
        if (values) {
            var fixedValues = {};
            for (var _i = 0, _a = Object.keys(values); _i < _a.length; _i++) {
                var key_1 = _a[_i];
                if (values[key_1] instanceof MessageRef_1.MessageRef) {
                    fixedValues[key_1] = this.message(values[key_1]);
                }
                else if (values[key_1] instanceof DecimalFormatRef_1.DecimalFormatRef) {
                    fixedValues[key_1] = this.decimalFormat(values[key_1]);
                }
                else {
                    fixedValues[key_1] = values[key_1];
                }
            }
            values = fixedValues;
        }
        var formatter = this.formatterInstance(intl_messageformat_1.default, namespaceAndKey.namespace + "," + namespaceAndKey.key);
        if (formatter && formatter !== defaultMessageFormat && !formats) {
            return formatter.format(values);
        }
        var message = messages_1.findMessage(this._locales, namespaceAndKey.namespace, namespaceAndKey.key);
        if (typeof message == "string") {
            formatter = this.formatterInstance(intl_messageformat_1.default, namespaceAndKey.namespace + "," + namespaceAndKey.key, [message]);
            if (formatter !== defaultMessageFormat) {
                formatter = new intl_messageformat_1.default(message, this._locale, formats);
            }
            if (formatter && formatter !== defaultMessageFormat) {
                return formatter.format(values);
            }
            else {
                return message;
            }
        }
        // value is stored in a file
        else if (message && message.file) {
            return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var contents, error_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.readFile(message.file)];
                        case 1:
                            contents = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            reject(error_1);
                            return [2 /*return*/];
                        case 3:
                            formatter = new intl_messageformat_1.default(contents, this._locale, formats);
                            resolve(formatter.format(values));
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    IntlHelper.prototype.readFile = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.resourcesLocation) {
                var url_1 = _this.resourcesLocation + "/" + file;
                var xhr_1 = new XMLHttpRequest();
                xhr_1.onerror = function (error) {
                    reject(error);
                };
                xhr_1.ontimeout = function () {
                    reject(new Error("Timeout when fetching intl resource " + url_1));
                };
                xhr_1.onload = function () {
                    resolve(xhr_1.responseText);
                };
                xhr_1.open("GET", url_1, true);
                xhr_1.send();
            }
            else if (_this.resourcesLocation && _this.resourcesLocation.startsWith("./") || _this.resourcesLocation.startsWith("/")) {
            }
            else {
                reject(new Error("Not able to read intl resource file " + file));
            }
        });
    };
    IntlHelper.prototype.relativeFormat = function (dateTime, options) {
        if (typeof dateTime === "number") {
            dateTime = new Date(dateTime);
        }
        else if (dateTime instanceof core_1.DateTimezone) {
            dateTime = dateTime.date;
        }
        if (dateTime === null || dateTime === undefined) {
            dateTime = new Date();
        }
        var diff = selectUnit_1.selectUnit(dateTime);
        return this.formatterInstance(Intl["RelativeTimeFormat"], undefined, [Object.assign({ numeric: "auto" }, options)]).format(diff.value, diff.unit);
    };
    IntlHelper.prototype.dateFormat = function (dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("date", dateTime, predefinedOptionsOrOptions, options);
    };
    IntlHelper.prototype.timeFormat = function (dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("time", dateTime, predefinedOptionsOrOptions, options);
    };
    IntlHelper.prototype.dateTimeFormat = function (dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("dateTime", dateTime, predefinedOptionsOrOptions, options);
    };
    IntlHelper.prototype.dateTimeFormatImpl = function (mode, dateTime, predefinedOptionsOrOptions, options) {
        var predefinedOptions = typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.DateTimeFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions;
        predefinedOptions = Object.assign({}, predefinedOptions, options);
        if (mode == "time") {
            predefinedOptions.year = undefined;
            predefinedOptions.month = undefined;
            predefinedOptions.day = undefined;
            predefinedOptions.weekday = undefined;
            predefinedOptions.era = undefined;
            if (!predefinedOptions.hour && !predefinedOptions.minute && !predefinedOptions.second && !predefinedOptions.timeZoneName) {
                predefinedOptions.hour = "2-digit";
                predefinedOptions.minute = "2-digit";
                predefinedOptions.second = "2-digit";
            }
        }
        else if (mode == "date") {
            predefinedOptions.hour = undefined;
            predefinedOptions.minute = undefined;
            predefinedOptions.second = undefined;
            if (!predefinedOptions.year && !predefinedOptions.month && !predefinedOptions.day && !predefinedOptions.weekday && !predefinedOptions.era && !predefinedOptions.timeZoneName) {
                predefinedOptions.year = "numeric";
                predefinedOptions.month = "numeric";
                predefinedOptions.day = "numeric";
            }
        }
        else {
            predefinedOptions = Object.assign({ year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }, predefinedOptions);
        }
        if (dateTime instanceof core_1.DateTimezone) {
            if (!dateTime.timezone) {
                predefinedOptions.timeZone = "UTC";
                predefinedOptions.timeZoneName = undefined;
            }
            else if (dateTime.timezone !== "current") {
                predefinedOptions.timeZone = dateTime.timezone;
            }
            dateTime = dateTime.date;
        }
        var formatter = this.formatterInstance(Intl.DateTimeFormat, undefined, [predefinedOptions]);
        return formatter.format(dateTime);
    };
    IntlHelper.prototype.currencyFormat = function (value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("currency", value, predefinedOptionsOrOptions, additionalOptions);
    };
    IntlHelper.prototype.decimalFormat = function (value, predefinedOptionsOrOptions, additionalOptions) {
        if (value instanceof DecimalFormatRef_1.DecimalFormatRef) {
            return this.numberFormatImpl("decimal", value.value, value.predefined, value.options);
        }
        return this.numberFormatImpl("decimal", value, predefinedOptionsOrOptions, additionalOptions);
    };
    IntlHelper.prototype.percentFormat = function (value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("percent", value, predefinedOptionsOrOptions, additionalOptions);
    };
    IntlHelper.prototype.numberFormatImpl = function (mode, value, predefinedOptionsOrOptions, additionalOptions) {
        var options = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.NumberFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions, additionalOptions);
        if (mode == "currency") {
            options.style = "currency";
        }
        else if (mode == "percent") {
            options.style = "percent";
        }
        else {
            options.style = "decimal";
        }
        if (value instanceof Money_1.Money) {
            if (mode == "currency") {
                options.currency = value.currency.code;
            }
            value = value.amount.toNumber();
        }
        else if (value instanceof bignumber_js_1.BigNumber) {
            value = value.toNumber();
        }
        else if (Array.isArray(value) && value) {
            if (mode == "currency") {
                if (value[0] instanceof Currency_1.Currency) {
                    options.currency = value[0].code;
                }
                else if (value[0]) {
                    options.currency = value[0];
                }
            }
            if (value[1] instanceof bignumber_js_1.BigNumber) {
                value = value[1].toNumber();
            }
            else {
                value = value[1];
            }
        }
        var formatter = this.formatterInstance(Intl.NumberFormat, undefined, [options]);
        return formatter.format(value);
    };
    return IntlHelper;
}());
exports.IntlHelper = IntlHelper;
function getCacheId(inputs) {
    var cacheId = [];
    var i, len, input;
    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];
        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        }
        else {
            cacheId.push(input);
        }
    }
    return JSON.stringify(cacheId);
}
function orderedProps(obj) {
    var props = [], keys = [];
    var key, i, len, prop;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    var orderedKeys = keys.sort();
    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key = orderedKeys[i];
        prop = {};
        prop[key] = obj[key];
        props[i] = prop;
    }
    return props;
}
//# sourceMappingURL=IntlHelper.js.map