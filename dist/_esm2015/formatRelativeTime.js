import { DateTimezone } from "@co.mmons/js-utils/core";
import { bestRelativeTimeFormatValue } from "./bestRelativeTimeFormatValue";
import { defineGlobals } from "./defineGlobals";
import { IntlContext } from "./IntlContext";
defineGlobals();
export function formatRelativeTime() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    let value = arguments[0 + knownContext];
    const options = arguments[1 + knownContext];
    if (typeof value === "number") {
        value = new Date(value);
    }
    else if (value instanceof DateTimezone) {
        value = value.date;
    }
    else if (value && !(value instanceof Date) && typeof value.toDate === "function") {
        value = value.toDate();
    }
    if (value === null || value === undefined) {
        value = new Date();
    }
    const diff = bestRelativeTimeFormatValue(value);
    return new Intl.RelativeTimeFormat(context.locales, Object.assign({ numeric: "auto" }, options)).format(diff.value, diff.unit);
}
//# sourceMappingURL=formatRelativeTime.js.map