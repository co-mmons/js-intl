import { BigNumber } from "bignumber.js";
import { DecimalFormatRef } from "./DecimalFormatRef";
import { IntlContext } from "./IntlContext";
declare type ValueType = number | BigNumber | DecimalFormatRef;
declare type PredefinedOptionsType = string | Intl.NumberFormatOptions;
export declare function formatDecimal(value: ValueType, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions): any;
export declare function formatDecimal(context: IntlContext, value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsType, additionalOptions?: Intl.NumberFormatOptions): any;
export {};
