"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlHelper = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@co.mmons/js-utils/core");
const bignumber_js_1 = require("bignumber.js");
const intl_messageformat_1 = require("intl-messageformat");
const Currency_1 = require("./Currency");
const DecimalFormatRef_1 = require("./DecimalFormatRef");
const defineGlobals_1 = require("./defineGlobals");
const MessageRef_1 = require("./MessageRef");
const messages_1 = require("./messages");
const Money_1 = require("./Money");
const selectUnit_1 = require("./selectUnit");
defineGlobals_1.defineGlobals();
function loadPolyfillsLocale() {
    if (INTL_POLYFILL && INTL_POLYFILL.length && IntlPolyfill) {
        for (const a of INTL_POLYFILL) {
            IntlPolyfill.__addLocaleData(a);
        }
        INTL_POLYFILL = [];
    }
    if (INTL_RELATIVE_POLYFILL && INTL_RELATIVE_POLYFILL.length && Intl["RelativeTimeFormat"] && Intl["RelativeTimeFormat"]["__addLocaleData"]) {
        for (const a of INTL_RELATIVE_POLYFILL) {
            Intl["RelativeTimeFormat"]["__addLocaleData"](a);
        }
        INTL_RELATIVE_POLYFILL = [];
    }
}
loadPolyfillsLocale();
const defaultMessageFormat = new intl_messageformat_1.default("", "en", {}, { ignoreTag: true });
class IntlHelper {
    constructor(defaultLocale, defaultNamespace) {
        this.defaultNamespace = defaultNamespace;
        this.useCache = true;
        this.namespaceAliases = {};
        this.formatters = {};
        this.formattersOptions = {};
        this.locale = defaultLocale;
        this.defaultNamespace = defaultNamespace;
        loadPolyfillsLocale();
    }
    setResourcesLocation(location) {
        this.resourcesLocation = location;
    }
    setDefaultNamespace(namespace) {
        this.defaultNamespace = namespace;
    }
    addNamespaceAlias(namespace, alias) {
        this.namespaceAliases[alias] = namespace;
    }
    get locale() {
        return this._locale;
    }
    set locale(locale) {
        this._locale = locale || INTL_LOCALE || INTL_DEFAULT_LOCALE || "en-US";
        this._locales = [];
        let segments = this._locale.split("-");
        for (let i = 0; i < segments.length; i++) {
            this._locales.push(segments.slice(0, i + 1).join("-"));
        }
        this.formatters = {};
    }
    setLocale(locale) {
        this.locale = locale;
        return this;
    }
    get locales() {
        if (this._locales) {
            return this._locales.slice();
        }
        return [];
    }
    formatterInstance(formatterConstructor, id, constructorArguments) {
        let cacheKey = id ? `${formatterConstructor.name}_${id}` : getCacheId([formatterConstructor.name].concat(constructorArguments));
        let formatter = this.formatters[cacheKey];
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
    }
    formatterInstanceExists(formatter, id) {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        id = `${formatterName}_${id}`;
        return id in this.formatters[id];
    }
    addFormatterPredefinedOptions(formatter, key, options) {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        if (!this.formattersOptions[formatterName]) {
            this.formattersOptions[formatterName] = {};
        }
        this.formattersOptions[formatterName][key] = options;
    }
    addDateTimePredefinedOptions(key, options) {
        this.addFormatterPredefinedOptions(Intl.DateTimeFormat.name, key, options);
    }
    findFormatterPredefinedOptions(formatter, key) {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        if (this.formattersOptions[formatterName]) {
            return this.formattersOptions[formatterName][key];
        }
        return undefined;
    }
    value(value) {
        if (!value) {
            return;
        }
        for (let locale of this._locales) {
            if (value[locale]) {
                return value[locale];
            }
        }
    }
    messagesImport(resourcePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield messages_1.importMessages(`${this.resourcesLocation}/${resourcePath}/${this.locale}.json`);
        });
    }
    messageFormat(message, values, formats) {
        return new intl_messageformat_1.default(message, this._locale, formats, { ignoreTag: true }).format(values);
    }
    message(key, values, formats) {
        const message = this.messageImpl(Array.isArray(key) ? (key.length > 0 ? key[0] : "") : key, values, formats);
        if (typeof message === "string") {
            return message;
        }
        else if (message) {
            throw new Error("External message, use asyncMessage()");
        }
        else {
            return undefined;
        }
    }
    asyncMessage(key, values, formats) {
        const message = this.messageImpl(key, values, formats);
        if (typeof message === "string") {
            return Promise.resolve(message);
        }
        else {
            return message;
        }
    }
    messageImpl(key, values, formats) {
        let namespaceAndKey = messages_1.extractMessageNamespaceAndKey(key, this.defaultNamespace);
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
            const fixedValues = {};
            for (const key of Object.keys(values)) {
                if (values[key] instanceof MessageRef_1.MessageRef) {
                    fixedValues[key] = this.message(values[key]);
                }
                else if (values[key] instanceof DecimalFormatRef_1.DecimalFormatRef) {
                    fixedValues[key] = this.decimalFormat(values[key]);
                }
                else {
                    fixedValues[key] = values[key];
                }
            }
            values = fixedValues;
        }
        let formatter = this.formatterInstance(intl_messageformat_1.default, `${namespaceAndKey.namespace},${namespaceAndKey.key}`);
        if (formatter && formatter !== defaultMessageFormat && !formats) {
            return formatter.format(values);
        }
        let message = messages_1.findMessage(this._locales, namespaceAndKey.namespace, namespaceAndKey.key);
        if (typeof message == "string") {
            formatter = this.formatterInstance(intl_messageformat_1.default, `${namespaceAndKey.namespace},${namespaceAndKey.key}`, [message]);
            if (formatter !== defaultMessageFormat) {
                formatter = new intl_messageformat_1.default(message, this._locale, formats, { ignoreTag: true });
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
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let contents;
                try {
                    contents = yield this.readFile(message.file);
                }
                catch (error) {
                    reject(error);
                    return;
                }
                formatter = new intl_messageformat_1.default(contents, this._locale, formats, { ignoreTag: true });
                resolve(formatter.format(values));
            }));
        }
    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            if (this.resourcesLocation) {
                let url = `${this.resourcesLocation}/${file}`;
                let xhr = new XMLHttpRequest();
                xhr.onerror = (error) => {
                    reject(error);
                };
                xhr.ontimeout = () => {
                    reject(new Error(`Timeout when fetching intl resource ${url}`));
                };
                xhr.onload = () => {
                    resolve(xhr.responseText);
                };
                xhr.open("GET", url, true);
                xhr.send();
            }
            else if (this.resourcesLocation && this.resourcesLocation.startsWith("./") || this.resourcesLocation.startsWith("/")) {
            }
            else {
                reject(new Error(`Not able to read intl resource file ${file}`));
            }
        });
    }
    relativeFormat(dateTime, options) {
        if (typeof dateTime === "number") {
            dateTime = new Date(dateTime);
        }
        else if (dateTime instanceof core_1.DateTimezone) {
            dateTime = dateTime.date;
        }
        else if (dateTime && !(dateTime instanceof Date) && typeof dateTime.toDate === "function") {
            dateTime = dateTime.toDate();
        }
        if (dateTime === null || dateTime === undefined) {
            dateTime = new Date();
        }
        const diff = selectUnit_1.selectUnit(dateTime);
        return this.formatterInstance(Intl["RelativeTimeFormat"], undefined, [Object.assign({ numeric: "auto" }, options)]).format(diff.value, diff.unit);
    }
    dateFormat(dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("date", dateTime, predefinedOptionsOrOptions, options);
    }
    timeFormat(dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("time", dateTime, predefinedOptionsOrOptions, options);
    }
    dateTimeFormat(dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("dateTime", dateTime, predefinedOptionsOrOptions, options);
    }
    dateTimeFormatImpl(mode, dateTime, predefinedOptionsOrOptions, options) {
        let predefinedOptions = typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.DateTimeFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions;
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
            predefinedOptions = Object.assign({
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }, predefinedOptions);
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
        else if (dateTime instanceof core_1.TimeZoneDate) {
            if (!dateTime.timeZone) {
                predefinedOptions.timeZone = "UTC";
                predefinedOptions.timeZoneName = undefined;
            }
            else {
                predefinedOptions.timeZone = dateTime.timeZone !== "current" ? dateTime.timeZone : undefined;
                predefinedOptions.timeZoneName = "timeZoneName" in predefinedOptions ? predefinedOptions.timeZoneName : "short";
            }
        }
        else if (typeof dateTime === "number") {
            dateTime = new Date(dateTime);
        }
        else if (dateTime && !(dateTime instanceof Date) && typeof dateTime.toDate === "function") {
            dateTime = dateTime.toDate();
        }
        const formatter = this.formatterInstance(Intl.DateTimeFormat, undefined, [predefinedOptions]);
        return formatter.format(dateTime);
    }
    currencyFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("currency", value, predefinedOptionsOrOptions, additionalOptions);
    }
    decimalFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        if (value instanceof DecimalFormatRef_1.DecimalFormatRef) {
            return this.numberFormatImpl("decimal", value.value, value.predefined, value.options);
        }
        return this.numberFormatImpl("decimal", value, predefinedOptionsOrOptions, additionalOptions);
    }
    percentFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("percent", value, predefinedOptionsOrOptions, additionalOptions);
    }
    numberFormatImpl(mode, value, predefinedOptionsOrOptions, additionalOptions) {
        let options = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.NumberFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions, additionalOptions);
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
        let formatter = this.formatterInstance(Intl.NumberFormat, undefined, [options]);
        return formatter.format(value);
    }
}
exports.IntlHelper = IntlHelper;
function getCacheId(inputs) {
    let cacheId = [];
    let i, len, input;
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
    let props = [], keys = [];
    let key, i, len, prop;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    let orderedKeys = keys.sort();
    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key = orderedKeys[i];
        prop = {};
        prop[key] = obj[key];
        props[i] = prop;
    }
    return props;
}
//# sourceMappingURL=IntlHelper.js.map