"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@co.mmons/js-utils/core");
var intl_messageformat_1 = require("intl-messageformat");
var intl_relativeformat_1 = require("intl-relativeformat");
var money_1 = require("./money");
var currency_1 = require("./currency");
if (typeof window !== "undefined" && window["INTL_MESSAGES"]) {
    window["INTL_MESSAGES"] = {};
}
if (typeof global !== "undefined" && !global["INTL_MESSAGES"]) {
    global["INTL_MESSAGES"] = {};
}
var IntlHelper = (function () {
    function IntlHelper(defaultLocale, defaultNamespace) {
        this.defaultNamespace = defaultNamespace;
        this.useCache = true;
        this.namespaceAliases = {};
        this.formatters = {};
        this.formattersOptions = {};
        this.locale = defaultLocale;
        this.defaultNamespace = defaultNamespace;
    }
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
            this._locale = locale;
            this._locales = [];
            var segments = locale.split("-");
            for (var i = 0; i < segments.length; i++) {
                this._locales.push(segments.slice(0, i + 1).join("-"));
            }
            this.formatters = {};
        },
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    IntlHelper.prototype.formatterInstance = function (formatterConstructor, id, constructorArguments) {
        var cacheKey = id ? formatterConstructor.name + "_" + id : getCacheId([formatterConstructor.name].concat(constructorArguments));
        var formatter = this.formatters[cacheKey];
        if (!formatter && constructorArguments) {
            if (formatterConstructor === intl_messageformat_1.default && !this.isMessageNeedsFormatter(constructorArguments[0])) {
                formatter = intl_messageformat_1.default.default;
            }
            else if (formatterConstructor === intl_relativeformat_1.default) {
                formatter = new intl_relativeformat_1.default(this._locales, constructorArguments[0]);
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
    IntlHelper.prototype.findMessage = function (namespace, key) {
        for (var _i = 0, _a = this._locales; _i < _a.length; _i++) {
            var locale = _a[_i];
            if (INTL_MESSAGES && INTL_MESSAGES[namespace] && INTL_MESSAGES[namespace][locale] && INTL_MESSAGES[namespace][locale][key]) {
                return INTL_MESSAGES[namespace][locale][key];
            }
        }
        return "???";
    };
    IntlHelper.prototype.isMessageNeedsFormatter = function (message) {
        return message.indexOf("{") > -1 || message.indexOf("}") > -1;
    };
    IntlHelper.prototype.extractMessageNamespaceAndKey = function (namespaceAndKey, useDefaultNamespace) {
        if (useDefaultNamespace === void 0) { useDefaultNamespace = true; }
        var result = { namespace: undefined, key: undefined };
        if (namespaceAndKey[0] == ".") {
            result.namespace = useDefaultNamespace ? this.defaultNamespace : undefined;
            result.key = namespaceAndKey.substring(1);
        }
        else {
            var dot = namespaceAndKey.indexOf(".");
            if (dot > -1) {
                result.namespace = namespaceAndKey.substring(0, dot);
                result.key = namespaceAndKey.substring(dot + 1);
            }
            else {
                result.namespace = useDefaultNamespace ? this.defaultNamespace : undefined;
                result.key = namespaceAndKey;
            }
        }
        return result;
    };
    IntlHelper.prototype.message = function (key, values, formats) {
        var namespaceAndKey = this.extractMessageNamespaceAndKey(key);
        if (!namespaceAndKey.namespace) {
            throw new Error("Undefined i18n messages namespace");
        }
        var formatter = this.formatterInstance(intl_messageformat_1.default, namespaceAndKey.namespace + "," + namespaceAndKey.key);
        if (formatter && formatter !== intl_messageformat_1.default.default && !formats) {
            return formatter.format(values);
        }
        var message = this.findMessage(namespaceAndKey.namespace, namespaceAndKey.key);
        formatter = this.formatterInstance(intl_messageformat_1.default, namespaceAndKey.namespace + "," + namespaceAndKey.key, [message]);
        if (formats && formatter !== intl_messageformat_1.default.default) {
            formatter = new intl_messageformat_1.default(message, this._locale, formats);
        }
        if (formatter && formatter !== intl_messageformat_1.default.default) {
            return formatter.format(values);
        }
        else {
            return message;
        }
    };
    IntlHelper.prototype.relativeFormat = function (dateTime, options) {
        return this.formatterInstance(intl_relativeformat_1.default, undefined, [options]).format(typeof dateTime == "number" ? new Date(dateTime) : dateTime, options);
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
            predefinedOptions.timeZoneName = undefined;
            if (!predefinedOptions.year && !predefinedOptions.month && !predefinedOptions.day && !predefinedOptions.weekday && !predefinedOptions.era) {
                predefinedOptions.year = "numeric";
                predefinedOptions.month = "numeric";
                predefinedOptions.day = "numeric";
            }
        }
        else {
            predefinedOptions = Object.assign({ year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }, predefinedOptions);
        }
        var formatter = this.formatterInstance(Intl.DateTimeFormat, undefined, [predefinedOptions]);
        return formatter.format(dateTime);
    };
    IntlHelper.prototype.currencyFormat = function (value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("currency", value, predefinedOptionsOrOptions, additionalOptions);
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
        if (value instanceof money_1.Money) {
            if (mode == "currency") {
                options.currency = value.currency.code;
            }
            value = value.amount.toNumber();
        }
        else if (value instanceof core_1.BigNumber) {
            value = value.toNumber();
        }
        else if (Array.isArray(value) && value) {
            if (mode == "currency") {
                if (value[0] instanceof currency_1.Currency) {
                    options.currency = value[0].code;
                }
                else if (value[0]) {
                    options.currency = value[0];
                }
            }
            if (value[1] instanceof core_1.BigNumber) {
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
//# sourceMappingURL=helper.js.map