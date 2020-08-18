declare var INTL_LOCALE: string;
declare var INTL_DEFAULT_LOCALE: string;
declare var INTL_SUPPORTED_LOCALE: string[] | string;
declare var INTL_LOCALE_URL_PATH: boolean | string;
declare var INTL_LOCALE_URL_PARAM: string;
declare var INTL_LOCALE_STORAGE_KEY: string;

for (const v of ["INTL_LOCALE", "INTL_DEFAULT_LOCALE", "INTL_SUPPORTED_LOCALE", "INTL_LOCALE_URL_PARAM", "INTL_LOCALE_URL_PATH", "INTL_LOCALE_STORAGE_KEY"]) {
    if (typeof window !== "undefined" && !window[v]) {
        window[v] = undefined;
    }

    if (typeof global !== "undefined" && !global[v]) {
        global[v] = undefined;
    }
}
