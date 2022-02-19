"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlHelper = void 0;
const intl_messageformat_1 = require("intl-messageformat");
const defineGlobals_1 = require("./defineGlobals");
const formatDecimal_1 = require("./formatDecimal");
const formatMessage_1 = require("./formatMessage");
const formatNumber_1 = require("./formatNumber");
const formatRelativeTime_1 = require("./formatRelativeTime");
const formatTimeOrDateOrDateTime_1 = require("./formatTimeOrDateOrDateTime");
const IntlContext_1 = require("./IntlContext");
const translate_1 = require("./translate");
(0, defineGlobals_1.defineGlobals)();
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
class IntlHelper extends IntlContext_1.IntlContext {
    constructor(defaultLocale, defaultNamespace) {
        super();
        this.useCache = true;
        this.namespaceAliases = {};
        this.locale = defaultLocale;
        this.defaultNamespace$ = defaultNamespace;
        loadPolyfillsLocale();
    }
    setResourcesLocation(location) {
        this.resourcesLocation = location;
    }
    get defaultNamespace() {
        return this.defaultNamespace$;
    }
    setDefaultNamespace(namespace) {
        this.defaultNamespace$ = namespace;
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
    messageFormat(message, values, formats) {
        return (0, formatMessage_1.formatMessage)(this, message, values, formats);
    }
    message(key, values, formats) {
        const message = (0, translate_1.translate)(this, Array.isArray(key) ? (key.length > 0 ? key[0] : "") : key, values, { formats });
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
    relativeFormat(dateTime, options) {
        return (0, formatRelativeTime_1.formatRelativeTime)(this, dateTime, options);
    }
    dateFormat(dateTime, predefinedOptionsOrOptions, options) {
        return (0, formatTimeOrDateOrDateTime_1.formatTimeOrDateOrDateTime)(this, "date", dateTime, predefinedOptionsOrOptions, options);
    }
    timeFormat(dateTime, predefinedOptionsOrOptions, options) {
        return (0, formatTimeOrDateOrDateTime_1.formatTimeOrDateOrDateTime)(this, "time", dateTime, predefinedOptionsOrOptions, options);
    }
    dateTimeFormat(dateTime, predefinedOptionsOrOptions, options) {
        return (0, formatTimeOrDateOrDateTime_1.formatTimeOrDateOrDateTime)(this, "dateTime", dateTime, predefinedOptionsOrOptions, options);
    }
    currencyFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return (0, formatNumber_1.formatNumber)(this, "currency", value, predefinedOptionsOrOptions, additionalOptions);
    }
    decimalFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return (0, formatDecimal_1.formatDecimal)(this, value, predefinedOptionsOrOptions, additionalOptions);
    }
    percentFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return (0, formatNumber_1.formatNumber)(this, "percent", value, predefinedOptionsOrOptions, additionalOptions);
    }
}
exports.IntlHelper = IntlHelper;
//# sourceMappingURL=IntlHelper.js.map