import { CurrencyAndNumber } from "./CurrencyAndNumber";
import { IntlContext } from "./IntlContext";
import { Money } from "./Money";
declare type ValueType = Money | CurrencyAndNumber;
declare type PredefinedOptionsOrOptionsType = string | Intl.NumberFormatOptions;
export declare function formatCurrency(value: ValueType, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): any;
export declare function formatCurrency(context: IntlContext, value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, additionalOptions?: Intl.NumberFormatOptions): any;
export {};
