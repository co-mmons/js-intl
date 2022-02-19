import { DateTimezone, Timestamp, TimeZoneDate } from "@co.mmons/js-utils/core";
import { IntlContext } from "./IntlContext";
declare type ValueType = number | Date | DateTimezone | TimeZoneDate | Timestamp;
declare type PredefinedOptionsOrOptionsType = string | Intl.DateTimeFormatOptions;
export declare function formatDate(value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, options?: Intl.DateTimeFormatOptions): any;
export declare function formatDate(context: IntlContext, value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, options?: Intl.DateTimeFormatOptions): any;
export {};
