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
export declare function defineGlobals(): void;
