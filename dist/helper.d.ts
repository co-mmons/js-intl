import { Type, BigNumber } from "@co.mmons/js-utils/core";
import { Money } from "./money";
import { Currency } from "./currency";
import { MessageRef } from ".";
import { IntlValue } from "./value";
export declare type CurrencyAndNumber = [string | Currency, number | BigNumber];
export declare type MessageResult = string | Promise<string>;
export declare class IntlHelper {
    private defaultNamespace;
    constructor(defaultLocale: string, defaultNamespace?: string);
    /**
     * Path or url to a directory, where intl resources are stored.
     */
    resourcesLocation: string;
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
    private formatterInstance<T>(formatterConstructor, id, constructorArguments?);
    private formatterInstanceExists<T>(formatter, id);
    private formattersOptions;
    private addFormatterPredefinedOptions<T>(formatter, key, options);
    addDateTimePredefinedOptions(key: string, options: Intl.DateTimeFormatOptions): void;
    findFormatterPredefinedOptions<T>(formatter: string | Type<T>, key: string): any;
    value<T = string>(value: IntlValue<T>): T;
    message<T extends string | Promise<string> = string>(key: string | MessageRef, values?: any, formats?: any): T;
    private readFile(file);
    relativeFormat(dateTime: number | Date, options: any): string;
    dateFormat(dateTime: number | Date, options?: Intl.DateTimeFormatOptions): string;
    timeFormat(dateTime: number | Date, options?: Intl.DateTimeFormatOptions): string;
    dateTimeFormat(dateTime: number | Date, options?: Intl.DateTimeFormatOptions): string;
    private dateTimeFormatImpl(mode, dateTime, predefinedOptionsOrOptions?, options?);
    currencyFormat(value: Money | CurrencyAndNumber, predefinedOptions: string, additionalOptions?: Intl.NumberFormatOptions): any;
    currencyFormat(value: Money | CurrencyAndNumber, options?: Intl.NumberFormatOptions): any;
    decimalFormat(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string;
    percentFormat(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): string;
    private numberFormatImpl(mode, value, predefinedOptionsOrOptions?, additionalOptions?);
}
