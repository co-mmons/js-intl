import IntlMessageFormat from "intl-messageformat";
import { IntlContext } from "./IntlContext";
export function formatMessage() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const message = arguments[0 + knownContext];
    let values = arguments[1 + knownContext];
    let formats = arguments[2 + knownContext];
    return new IntlMessageFormat(message, context.locales, formats, { ignoreTag: true }).format(values);
}
//# sourceMappingURL=formatMessage.js.map