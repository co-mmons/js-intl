import {DateTimezone, Timestamp} from "@co.mmons/js-utils/core";
import {bestRelativeTimeFormatValue} from "./bestRelativeTimeFormatValue";
import {defineGlobals} from "./defineGlobals";
import {IntlContext} from "./IntlContext";

defineGlobals();

type ValueType = number | Date | DateTimezone | Timestamp;

export function formatRelativeTime(value: ValueType, options?: any);

export function formatRelativeTime(context: IntlContext, value: ValueType, options?: any);

export function formatRelativeTime() {

    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context: IntlContext = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    let value: ValueType = arguments[0 + knownContext];
    const options: any = arguments[1 + knownContext];

    if (typeof value === "number") {
        value = new Date(value);
    } else if (value instanceof DateTimezone) {
        value = value.date;
    } else if (value && !(value instanceof Date) && typeof value.toDate === "function") {
        value = value.toDate();
    }

    if (value === null || value === undefined) {
        value = new Date();
    }

    const diff = bestRelativeTimeFormatValue(value as Date);
    return new Intl.RelativeTimeFormat(context.locales, Object.assign({numeric: "auto"}, options)).format(diff.value, diff.unit);
}
