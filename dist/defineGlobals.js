"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineGlobals = void 0;
require("./globals");
function defineGlobals() {
    for (const v of ["INTL_LOCALE", "INTL_DEFAULT_LOCALE", "INTL_SUPPORTED_LOCALE", "INTL_LOCALE_URL_PARAM", "INTL_LOCALE_URL_PATH", "INTL_LOCALE_STORAGE_KEY", "INTL_POLYFILL", "INTL_RELATIVE_POLYFILL", "IntlPolyfill"]) {
        if (typeof window !== "undefined" && !window[v]) {
            window[v] = undefined;
        }
        if (typeof global !== "undefined" && !global[v]) {
            global[v] = undefined;
        }
    }
}
exports.defineGlobals = defineGlobals;
//# sourceMappingURL=defineGlobals.js.map