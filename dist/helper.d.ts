/// <reference types="bignumber.js" />
import { Type } from "@co.mmons/typescript-utils/core";
import { Money, BigNumber, Currency } from "@co.mmons/typescript-utils/finance";
export declare type CurrencyAndNumber = [string | Currency, number | BigNumber];
export declare class IntlHelper {
    private defaultNamespace;
    constructor(defaultLocale: string, defaultNamespace?: string);
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
    private findMessage(namespace, key);
    private isMessageNeedsFormatter(message);
    private extractMessageNamespaceAndKey(namespaceAndKey, useDefaultNamespace?);
    message(key: string, values: any, formats?: any): any;
    relativeFormat(dateTime: number | Date, options: any): string;
    dateFormat(dateTime: number | Date, options?: Intl.DateTimeFormatOptions): string;
    timeFormat(dateTime: number | Date, options?: Intl.DateTimeFormatOptions): string;
    dateTimeFormat(dateTime: number | Date, options?: Intl.DateTimeFormatOptions): string;
    private dateTimeFormatImpl(mode, dateTime, predefinedOptionsOrOptions?, options?);
    currencyFormat(value: Money | CurrencyAndNumber, predefinedOptions: string, additionalOptions?: Intl.NumberFormatOptions): any;
    currencyFormat(value: Money | CurrencyAndNumber, options?: Intl.NumberFormatOptions): any;
    private numberFormatImpl(mode, value, predefinedOptionsOrOptions?, additionalOptions?);
}
