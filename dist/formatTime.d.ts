import { DateTimezone, Timestamp, TimeZoneDate } from "@co.mmons/js-utils/core";
import { IntlContext } from "./IntlContext";
declare type ValueType = number | Date | DateTimezone | TimeZoneDate | Timestamp;
declare type PredefinedOptionsOrOptionsType = string | Intl.DateTimeFormatOptions;
export declare function formatTime(value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, options?: Intl.DateTimeFormatOptions): any;
export declare function formatTime(context: IntlContext, value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, options?: Intl.DateTimeFormatOptions): any;
export {};
