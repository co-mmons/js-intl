import {DateTimezone, Timestamp, TimeZoneDate} from "@co.mmons/js-utils/core";
import {BigNumber} from "bignumber.js";
import IntlMessageFormat from "intl-messageformat";
import {Currency} from "./Currency";
import {CurrencyAndNumber} from "./CurrencyAndNumber";
import {DecimalFormatRef} from "./DecimalFormatRef";
import {defineGlobals} from "./defineGlobals";
import {formatDecimal} from "./formatDecimal";
import {formatMessage} from "./formatMessage";
import {formatNumber} from "./formatNumber";
import {formatRelativeTime} from "./formatRelativeTime";
import {formatTimeOrDateOrDateTime} from "./formatTimeOrDateOrDateTime";
import {IntlContext} from "./IntlContext";
import {IntlStore} from "./IntlStore";
import {MessageRef} from "./MessageRef";
import {Money} from "./Money";
import {translate} from "./translate";

defineGlobals();

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

export type MessageResult = string | Promise<string>;

const defaultMessageFormat = new IntlMessageFormat("", "en", {}, {ignoreTag: true});

export class IntlHelper extends IntlContext {

    constructor(defaultLocale?: string, defaultNamespace?: string) {
        super();

        this.locale = defaultLocale;
        this.defaultNamespace$ = defaultNamespace;

        loadPolyfillsLocale();
    }

    /**
     * Path or url to a directory, where intl resources are stored.
     */
    public resourcesLocation: string;

    public setResourcesLocation(location: string) {
        this.resourcesLocation = location;
    }

    private useCache: boolean = true;

    private defaultNamespace$: string;

    get defaultNamespace() {
        return this.defaultNamespace$;
    }

    public setDefaultNamespace(namespace: string) {
        this.defaultNamespace$ = namespace;
    }

    private namespaceAliases: { [alias: string]: string } = {};

    public addNamespaceAlias(namespace: string, alias: string) {
        this.namespaceAliases[alias] = namespace;
    }

    /**
     * Selected locale. By default it takes browser locale.
     */
    private _locale: string;

    public get locale(): string {
        return this._locale;
    }

    public set locale(locale: string) {
        this._locale = locale || INTL_LOCALE || INTL_DEFAULT_LOCALE || "en-US";

        this._locales = [];

        let segments = this._locale.split("-");

        for (let i = 0; i < segments.length; i++) {
            this._locales.push(segments.slice(0, i + 1).join("-"));
        }
    }

    public setLocale(locale: string): this {
        this.locale = locale;
        return this;
    }

    /**
     * Selected locale's segments
     */
    private _locales: string[];

    public get locales(): string[] {

        if (this._locales) {
            return this._locales.slice();
        }

        return [];
    }

    public value<T = string>(value: IntlStore<T>): T {

        if (!value) {
            return;
        }

        for (let locale of this._locales) {
            if (value[locale]) {
                return value[locale];
            }
        }
    }

    messageFormat(message: string, values: { [key: string]: any }, formats?: any): string {
        return formatMessage(this, message, values, formats);
    }

    message(strings: TemplateStringsArray, ...values: any): string;

    message(key: string | MessageRef, values?: any, formats?: any);

    message(key: string | MessageRef | TemplateStringsArray, values?: any, formats?: any): string {

        const message = translate(this, Array.isArray(key) ? (key.length > 0 ? key[0] : "") : key, values, {formats});
        if (typeof message === "string") {
            return message as string;
        } else if (message) {
            throw new Error("External message, use asyncMessage()");
        } else {
            return undefined;
        }
    }

    relativeFormat(dateTime: number | Date | DateTimezone | Timestamp, options?: any): string {
        return formatRelativeTime(this, dateTime, options);
    }

    dateFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, options?: Intl.DateTimeFormatOptions): string;

    dateFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {
        return formatTimeOrDateOrDateTime(this, "date", dateTime, predefinedOptionsOrOptions, options);
    }

    timeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, options?: Intl.DateTimeFormatOptions): string;

    timeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {
        return formatTimeOrDateOrDateTime(this, "time", dateTime, predefinedOptionsOrOptions, options);
    }

    dateTimeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, options?: Intl.DateTimeFormatOptions): string;

    dateTimeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {
        return formatTimeOrDateOrDateTime(this, "dateTime", dateTime, predefinedOptionsOrOptions, options);
    }

    currencyFormat(value: Money | CurrencyAndNumber, predefinedOptions: string, additionalOptions?: Intl.NumberFormatOptions);

    currencyFormat(value: Money | CurrencyAndNumber, options?: Intl.NumberFormatOptions);

    currencyFormat(value: Money | CurrencyAndNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        return formatNumber(this, "currency", value, predefinedOptionsOrOptions, additionalOptions);
    }

    decimalFormat(value: number | BigNumber | DecimalFormatRef, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        return formatDecimal(this, value, predefinedOptionsOrOptions, additionalOptions);
    }

    percentFormat(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        return formatNumber(this, "percent", value, predefinedOptionsOrOptions, additionalOptions);
    }
}
