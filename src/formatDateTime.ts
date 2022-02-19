import {DateTimezone, Timestamp, TimeZoneDate} from "@co.mmons/js-utils/core";
import {formatTimeOrDateOrDateTime} from "./formatTimeOrDateOrDateTime";
import {IntlContext} from "./IntlContext";

type ValueType = number | Date | DateTimezone | TimeZoneDate | Timestamp;
type PredefinedOptionsOrOptionsType = string | Intl.DateTimeFormatOptions;

export function formatDateTime(value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, options?: Intl.DateTimeFormatOptions);

export function formatDateTime(context: IntlContext, value: ValueType, predefinedOptionsOrOptions?: PredefinedOptionsOrOptionsType, options?: Intl.DateTimeFormatOptions);

export function formatDateTime() {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value: ValueType = arguments[0 + knownContext];
    const predefinedOptionsOrOptions: PredefinedOptionsOrOptionsType = arguments[1 + knownContext];
    const options: Intl.DateTimeFormatOptions = arguments[2 + knownContext];

    return formatTimeOrDateOrDateTime(context, "dateTime", value, predefinedOptionsOrOptions, options);
}
