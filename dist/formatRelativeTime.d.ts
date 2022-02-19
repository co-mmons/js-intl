import { DateTimezone, Timestamp } from "@co.mmons/js-utils/core";
import { IntlContext } from "./IntlContext";
declare type ValueType = number | Date | DateTimezone | Timestamp;
export declare function formatRelativeTime(value: ValueType, options?: any): any;
export declare function formatRelativeTime(context: IntlContext, value: ValueType, options?: any): any;
export {};
