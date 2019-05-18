import { Type, BigNumber, DateTimezone } from "@co.mmons/js-utils/core";
import { Money } from "./money";
import { Currency } from "./currency";
import { MessageRef } from ".";
import { IntlValue } from "./value";
export declare type CurrencyAndNumber = [string | Currency, number | BigNumber];
export declare type MessageResult = string | Promise<string>;
export declare class IntlHelper {
    private defaultNamespace?;
    constructor(defaultLocale: string, defaultNamespace?: string);
    /**
     * Path or url to a directory, where intl resources are stored.
     */
    resourcesLocation: string;
    setResourcesLocation(location: string): void;
    private useCache;
    setDefaultNamespace(namespace: string): void;
    private namespaceAliases;
    addNamespaceAlias(namespace: string, alias: string): void;
    /**
     * Selected locale. By default it takes browser locale.
     */
    private _locale;
    locale: string;
    setLocale(locale: string): this;
    /**
     * Selected locale's segments
     */
    private _locales;
    readonly locales: string[];
    private formatters;
    private formatterInstance;
    private formatterInstanceExists;
    private formattersOptions;
    private addFormatterPredefinedOptions;
    addDateTimePredefinedOptions(key: string, options: Intl.DateTimeFormatOptions): void;
    findFormatterPredefinedOptions<T>(formatter: string | Type<T>, key: string): any;
    value<T = string>(value: IntlValue<T>): T;
    messagesImport(resourcePath: string): Promise<void>;
    messageFormat(message: string, values: {
        [key: string]: any;
    }, formats?: any): string;
    message<T extends string | Promise<string> = string>(key: string | MessageRef, values?: any, formats?: any): T;
    private readFile;
    relativeFormat(dateTime: number | Date | DateTimezone, options: any): string;
    dateFormat(dateTime: number | Date | DateTimezone, options?: Intl.DateTimeFormatOptions): string;
    timeFormat(dateTime: number | Date | DateTimezone, options?: Intl.DateTimeFormatOptions): string;
    dateTimeFormat(dateTime: number | Date | DateTimezone, options?: Intl.DateTimeFormatOptions): string;
    private dateTimeFormatImpl;
    currencyFormat(value: Money | CurrencyAndNumber, predefinedOptions: string, additionalOptions?: Intl.NumberFormatOptions): any;
    currencyFormat(value: Money | CurrencyAndNumber, options?: Intl.NumberFormatOptions): any;
    decimalFormat(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string;
    percentFormat(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string;
    private numberFormatImpl;
}
