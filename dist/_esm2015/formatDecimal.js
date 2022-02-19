import { DecimalFormatRef } from "./DecimalFormatRef";
import { defineGlobals } from "./defineGlobals";
import { formatNumber } from "./formatNumber";
import { IntlContext } from "./IntlContext";
defineGlobals();
export function formatDecimal() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const value = arguments[0 + knownContext];
    const predefinedOptions = arguments[1 + knownContext];
    const additionalOptions = arguments[2 + knownContext];
    if (value instanceof DecimalFormatRef) {
        return formatNumber(context, "decimal", value.value, value.predefined, value.options);
    }
    return formatNumber(context, "decimal", value, predefinedOptions, additionalOptions);
}
//# sourceMappingURL=formatDecimal.js.map