import {DateTimezone, Timestamp, TimeZoneDate, Type} from "@co.mmons/js-utils/core";
import {BigNumber} from "bignumber.js";
import IntlMessageFormat from "intl-messageformat";
import {Currency} from "./Currency";
import {DecimalFormatRef} from "./DecimalFormatRef";
import {defineGlobals} from "./defineGlobals";
import {IntlValue} from "./IntlValue";
import {MessageRef} from "./MessageRef";
import {extractMessageNamespaceAndKey, findMessage, importMessages, isMessageNeedsFormatter} from "./messages";
import {Money} from "./Money";
import {selectUnit} from "./selectUnit";

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

export type CurrencyAndNumber = [string | Currency, number | BigNumber];

export type MessageResult = string | Promise<string>;

const defaultMessageFormat = new IntlMessageFormat("", "en", {}, {ignoreTag: true});

export class IntlHelper {

    constructor(defaultLocale?: string, private defaultNamespace?: string) {
        this.locale = defaultLocale;
        this.defaultNamespace = defaultNamespace;

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

    public setDefaultNamespace(namespace: string) {
        this.defaultNamespace = namespace;
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

        this.formatters = {};
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


    private formatters: any = {};

    private formatterInstance<T>(formatterConstructor: Type<T>, id: string, constructorArguments?: any[]): T {

        let cacheKey = id ? `${formatterConstructor.name}_${id}` : getCacheId([formatterConstructor.name].concat(constructorArguments));
        let formatter = this.formatters[cacheKey];

        if (!formatter && constructorArguments) {

            if (formatterConstructor === <any>IntlMessageFormat && !isMessageNeedsFormatter(constructorArguments[0])) {
                formatter = defaultMessageFormat;
            } else if (formatterConstructor === Intl["RelativeTimeFormat"]) {
                formatter = new Intl["RelativeTimeFormat"](this._locales, constructorArguments[0]);
            } else if (formatterConstructor === Intl.DateTimeFormat) {
                formatter = new Intl.DateTimeFormat(this._locales, constructorArguments[0]);
            } else if (formatterConstructor === Intl.NumberFormat) {
                formatter = new Intl.NumberFormat(this._locales, constructorArguments[0]);
            }

            this.formatters[cacheKey] = formatter;
        }

        return formatter;
    }

    private formatterInstanceExists<T>(formatter: string | Type<T>, id: string): boolean {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        id = `${formatterName}_${id}`;
        return id in this.formatters[id];
    }

    private formattersOptions: any = {};

    private addFormatterPredefinedOptions<T>(formatter: string | Type<T>, key: string, options: any) {

        let formatterName = typeof formatter === "string" ? formatter : formatter.name;

        if (!this.formattersOptions[formatterName]) {
            this.formattersOptions[formatterName] = {};
        }

        this.formattersOptions[formatterName][key] = options;
    }

    public addDateTimePredefinedOptions(key: string, options: Intl.DateTimeFormatOptions) {
        this.addFormatterPredefinedOptions(Intl.DateTimeFormat.name, key, options);
    }

    public findFormatterPredefinedOptions<T>(formatter: string | Type<T>, key: string) {

        let formatterName = typeof formatter === "string" ? formatter : formatter.name;

        if (this.formattersOptions[formatterName]) {
            return this.formattersOptions[formatterName][key];
        }

        return undefined;
    }

    public value<T = string>(value: IntlValue<T>): T {

        if (!value) {
            return;
        }

        for (let locale of this._locales) {
            if (value[locale]) {
                return value[locale];
            }
        }
    }

    public async messagesImport(resourcePath: string) {
        await importMessages(`${this.resourcesLocation}/${resourcePath}/${this.locale}.json`);
    }

    public messageFormat(message: string, values: { [key: string]: any }, formats?: any): string {
        return new IntlMessageFormat(message, this._locale, formats, {ignoreTag: true}).format(values);
    }

    message(strings: TemplateStringsArray, ...values: any): string;

    message(key: string | MessageRef, values?: any, formats?: any);

    message(key: string | MessageRef | TemplateStringsArray, values?: any, formats?: any): string {

        const message = this.messageImpl(Array.isArray(key) ? (key.length > 0 ? key[0] : "") : key, values, formats);
        if (typeof message === "string") {
            return message as string;
        } else if (message) {
            throw new Error("External message, use asyncMessage()");
        } else {
            return undefined;
        }
    }

    asyncMessage(key: string | MessageRef, values?: any, formats?: any): Promise<string> {
        const message = this.messageImpl(key, values, formats);
        if (typeof message === "string") {
            return Promise.resolve(message);
        } else {
            return message;
        }
    }

    private messageImpl<T extends string | Promise<string> = string>(key: string | MessageRef, values?: any, formats?: any): T {

        let namespaceAndKey = extractMessageNamespaceAndKey(key, this.defaultNamespace);
        if (!namespaceAndKey.namespace) {
            return namespaceAndKey.key as T;
        }

        if (key instanceof MessageRef) {
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
                if (values[key] instanceof MessageRef) {
                    fixedValues[key] = this.message(values[key]);
                } else if (values[key] instanceof DecimalFormatRef) {
                    fixedValues[key] = this.decimalFormat(values[key]);
                } else {
                    fixedValues[key] = values[key];
                }
            }

            values = fixedValues;
        }

        let formatter = this.formatterInstance(IntlMessageFormat, `${namespaceAndKey.namespace},${namespaceAndKey.key}`);

        if (formatter && formatter !== defaultMessageFormat && !formats) {
            return formatter.format(values) as T;
        }

        let message = findMessage(this._locales, namespaceAndKey.namespace, namespaceAndKey.key);

        if (typeof message == "string") {
            formatter = this.formatterInstance(IntlMessageFormat, `${namespaceAndKey.namespace},${namespaceAndKey.key}`, [message]);

            if (formatter !== defaultMessageFormat) {
                formatter = new IntlMessageFormat(message, this._locale, formats, {ignoreTag: true});
            }

            if (formatter && formatter !== defaultMessageFormat) {
                return formatter.format(values) as T;
            } else {
                return message as T;
            }

        }

        // value is stored in a file
        else if (message && message.file) {
            return new Promise<string>(async (resolve, reject) => {

                let contents: string;

                try {
                    contents = await this.readFile(message.file);
                } catch (error) {
                    reject(error);
                    return;
                }

                formatter = new IntlMessageFormat(contents, this._locale, formats, {ignoreTag: true});
                resolve(formatter.format(values) as string);

            }) as T;
        }
    }

    private readFile(file: string) {

        return new Promise<string>((resolve, reject) => {

            if (this.resourcesLocation) {

                let url = `${this.resourcesLocation}/${file}`;

                let xhr = new XMLHttpRequest();

                xhr.onerror = (error) => {
                    reject(error);
                }

                xhr.ontimeout = () => {
                    reject(new Error(`Timeout when fetching intl resource ${url}`));
                }

                xhr.onload = () => {
                    resolve(xhr.responseText);
                }

                xhr.open("GET", url, true);
                xhr.send();
            } else if (this.resourcesLocation && this.resourcesLocation.startsWith("./") || this.resourcesLocation.startsWith("/")) {

            } else {
                reject(new Error(`Not able to read intl resource file ${file}`));
            }
        });
    }


    public relativeFormat(dateTime: number | Date | DateTimezone | Timestamp, options?: any): string {

        if (typeof dateTime === "number") {
            dateTime = new Date(dateTime);
        } else if (dateTime instanceof DateTimezone) {
            dateTime = dateTime.date;
        } else if (dateTime && !(dateTime instanceof Date) && typeof dateTime.toDate === "function") {
            dateTime = dateTime.toDate();
        }

        if (dateTime === null || dateTime === undefined) {
            dateTime = new Date();
        }

        const diff = selectUnit(dateTime as Date);

        return this.formatterInstance<any>(Intl["RelativeTimeFormat"], undefined, [Object.assign({numeric: "auto"}, options)]).format(diff.value, diff.unit);
    }


    public dateFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, options?: Intl.DateTimeFormatOptions): string;

    public dateFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {
        return this.dateTimeFormatImpl("date", dateTime, predefinedOptionsOrOptions, options);
    }

    public timeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, options?: Intl.DateTimeFormatOptions): string;

    public timeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {
        return this.dateTimeFormatImpl("time", dateTime, predefinedOptionsOrOptions, options);
    }

    public dateTimeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, options?: Intl.DateTimeFormatOptions): string;

    public dateTimeFormat(dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {
        return this.dateTimeFormatImpl("dateTime", dateTime, predefinedOptionsOrOptions, options);
    }

    private dateTimeFormatImpl(mode: string, dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string {

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

        } else if (mode == "date") {

            predefinedOptions.hour = undefined;
            predefinedOptions.minute = undefined;
            predefinedOptions.second = undefined;

            if (!predefinedOptions.year && !predefinedOptions.month && !predefinedOptions.day && !predefinedOptions.weekday && !predefinedOptions.era && !predefinedOptions.timeZoneName) {
                predefinedOptions.year = "numeric";
                predefinedOptions.month = "numeric";
                predefinedOptions.day = "numeric";
            }

        } else {
            predefinedOptions = Object.assign({
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }, predefinedOptions);

        }

        if (dateTime instanceof DateTimezone) {

            if (!dateTime.timezone) {
                predefinedOptions.timeZone = "UTC";
                predefinedOptions.timeZoneName = undefined;
            } else if (dateTime.timezone !== "current") {
                predefinedOptions.timeZone = dateTime.timezone;
            }

            dateTime = dateTime.date;

        } else if (dateTime instanceof TimeZoneDate) {

            if (!dateTime.timeZone) {
                predefinedOptions.timeZone = "UTC";
                predefinedOptions.timeZoneName = undefined;
            } else {
                predefinedOptions.timeZone = dateTime.timeZone !== "current" ? dateTime.timeZone : undefined;
                predefinedOptions.timeZoneName = "timeZoneName" in predefinedOptions ? predefinedOptions.timeZoneName : "short";
            }

        } else if (typeof dateTime === "number") {
            dateTime = new Date(dateTime);

        } else if (dateTime && !(dateTime instanceof Date) && typeof dateTime.toDate === "function") {
            dateTime = dateTime.toDate();
        }

        const formatter = this.formatterInstance(Intl.DateTimeFormat, undefined, [predefinedOptions]);
        return formatter.format(dateTime);
    }

    public currencyFormat(value: Money | CurrencyAndNumber, predefinedOptions: string, additionalOptions?: Intl.NumberFormatOptions);

    public currencyFormat(value: Money | CurrencyAndNumber, options?: Intl.NumberFormatOptions);

    public currencyFormat(value: Money | CurrencyAndNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        return this.numberFormatImpl("currency", value, predefinedOptionsOrOptions, additionalOptions);
    }

    public decimalFormat(value: number | BigNumber | DecimalFormatRef, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {

        if (value instanceof DecimalFormatRef) {
            return this.numberFormatImpl("decimal", value.value, value.predefined, value.options);
        }

        return this.numberFormatImpl("decimal", value, predefinedOptionsOrOptions, additionalOptions);
    }

    public percentFormat(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        return this.numberFormatImpl("percent", value, predefinedOptionsOrOptions, additionalOptions);
    }

    private numberFormatImpl(mode: string, value: number | Money | BigNumber | CurrencyAndNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string {

        let options: Intl.NumberFormatOptions = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.NumberFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions, additionalOptions);

        if (mode == "currency") {
            options.style = "currency";
        } else if (mode == "percent") {
            options.style = "percent";
        } else {
            options.style = "decimal";
        }

        if (value instanceof Money) {

            if (mode == "currency") {
                options.currency = value.currency.code;
            }

            value = value.amount.toNumber();

        } else if (value instanceof BigNumber) {
            value = value.toNumber();

        } else if (Array.isArray(value) && <CurrencyAndNumber>value) {

            if (mode == "currency") {

                if (value[0] instanceof Currency) {
                    options.currency = (<Currency>value[0]).code;

                } else if (value[0]) {
                    options.currency = <string>value[0];
                }
            }

            if (value[1] instanceof BigNumber) {
                value = (<BigNumber>value[1]).toNumber();
            } else {
                value = <number>value[1];
            }
        }

        let formatter = this.formatterInstance(Intl.NumberFormat, undefined, [options]);
        return formatter.format(<number>value);
    }
}

function getCacheId(inputs) {

    let cacheId = [];

    let i, len, input;

    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];

        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        } else {
            cacheId.push(input);
        }
    }

    return JSON.stringify(cacheId);
}

function orderedProps(obj) {
    let props = [],
        keys = [];

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