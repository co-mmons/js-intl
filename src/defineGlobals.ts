declare global {
    var INTL_LOCALE: string;
    var INTL_DEFAULT_LOCALE: string;
    var INTL_SUPPORTED_LOCALE: string[] | string;
    var INTL_LOCALE_URL_PATH: boolean | string;
    var INTL_LOCALE_URL_PARAM: string;
    var INTL_LOCALE_STORAGE_KEY: string;
    var INTL_POLYFILL: any[];
    var INTL_RELATIVE_POLYFILL: any[];
    var IntlPolyfill: any;
}

export function defineGlobals() {
    for (const v of ["INTL_LOCALE", "INTL_DEFAULT_LOCALE", "INTL_SUPPORTED_LOCALE", "INTL_LOCALE_URL_PARAM", "INTL_LOCALE_URL_PATH", "INTL_LOCALE_STORAGE_KEY", "INTL_POLYFILL", "INTL_RELATIVE_POLYFILL", "IntlPolyfill"]) {
        if (typeof window !== "undefined" && !window[v]) {
            window[v] = undefined;
        }

        if (typeof global !== "undefined" && !global[v]) {
            global[v] = undefined;
        }
    }
}
