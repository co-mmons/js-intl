import { HtmlString } from "@co.mmons/js-utils/core";
import IntlMessageFormat from "intl-messageformat";
import { IntlContext } from "./IntlContext";
export function formatMessage() {
    const knownContext = arguments[0] instanceof IntlContext ? 1 : 0;
    const context = knownContext ? arguments[0] : INTL_DEFAULT_CONTEXT;
    const message = arguments[0 + knownContext];
    const html = message instanceof HtmlString;
    let values = arguments[1 + knownContext];
    let formats = arguments[2 + knownContext];
    const formatted = new IntlMessageFormat(message.toString(), context.locales, formats, { ignoreTag: true }).format(values);
    if (html) {
        return new HtmlString(formatted);
    }
    else {
        return formatted;
    }
}
//# sourceMappingURL=formatMessage.js.map