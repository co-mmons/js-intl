import { formatTimeOrDateOrDateTime } from "./formatTimeOrDateOrDateTime";
import { IntlContext } from "./IntlContext";
export function formatDate() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value = arguments[0 + knownContext];
    const predefinedOptionsOrOptions = arguments[1 + knownContext];
    const options = arguments[2 + knownContext];
    return formatTimeOrDateOrDateTime(context, "date", value, predefinedOptionsOrOptions, options);
}
//# sourceMappingURL=formatDate.js.map