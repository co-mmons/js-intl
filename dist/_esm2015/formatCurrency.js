import { defineGlobals } from "./defineGlobals";
import { formatNumber } from "./formatNumber";
import { IntlContext } from "./IntlContext";
defineGlobals();
export function formatCurrency() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value = arguments[0 + knownContext];
    const predefinedOptions = arguments[1 + knownContext];
    const additionalOptions = arguments[2 + knownContext];
    return formatNumber(context, "currency", value, predefinedOptions, additionalOptions);
}
//# sourceMappingURL=formatCurrency.js.map