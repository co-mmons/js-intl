import "./globals";
let defined = false;
export function defineGlobals() {
    if (defined) {
        return;
    }
    for (const v of ["INTL_DEFAULT_CONTEXT", "INTL_LOCALE", "INTL_DEFAULT_LOCALE", "INTL_SUPPORTED_LOCALE", "INTL_LOCALE_URL_PARAM", "INTL_LOCALE_URL_PATH", "INTL_LOCALE_MATRIX_PATH", "INTL_LOCALE_MATRIX_PARAM", "INTL_LOCALE_STORAGE_KEY", "INTL_POLYFILL", "INTL_RELATIVE_POLYFILL", "IntlPolyfill", "INTL_VALUES", "INTL_VALUES_VERSIONS", "INTL_MESSAGES", "INTL_MESSAGES_VERSIONS"]) {
        if (typeof window !== "undefined" && !window[v]) {
            window[v] = undefined;
        }
        if (typeof global !== "undefined" && !global[v]) {
            global[v] = undefined;
        }
    }
    defined = true;
}
//# sourceMappingURL=defineGlobals.js.map