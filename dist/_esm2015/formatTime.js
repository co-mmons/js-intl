import { formatTimeOrDateOrDateTime } from "./formatTimeOrDateOrDateTime";
import { IntlContext } from "./IntlContext";
export function formatTime() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value = arguments[0 + knownContext];
    const predefinedOptionsOrOptions = arguments[1 + knownContext];
    const options = arguments[2 + knownContext];
    return formatTimeOrDateOrDateTime(context, "time", value, predefinedOptionsOrOptions, options);
}
//# sourceMappingURL=formatTime.js.map