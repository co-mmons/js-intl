"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineGlobals = void 0;
require("./globals");
let defined = false;
function defineGlobals() {
    if (defined) {
        return;
    }
    for (const v of ["INTL_LOCALE", "INTL_DEFAULT_LOCALE", "INTL_SUPPORTED_LOCALE", "INTL_LOCALE_URL_PARAM", "INTL_LOCALE_URL_PATH", "INTL_LOCALE_MATRIX_PATH", "INTL_LOCALE_MATRIX_PARAM", "INTL_LOCALE_STORAGE_KEY", "INTL_POLYFILL", "INTL_RELATIVE_POLYFILL", "IntlPolyfill", "INTL_MESSAGES", "INTL_MESSAGES_VERSIONS"]) {
        if (typeof window !== "undefined" && !window[v]) {
            window[v] = undefined;
        }
        if (typeof global !== "undefined" && !global[v]) {
            global[v] = undefined;
        }
    }
    defined = true;
}
exports.defineGlobals = defineGlobals;
//# sourceMappingURL=defineGlobals.js.map