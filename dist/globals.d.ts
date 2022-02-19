declare var INTL_DEFAULT_CONTEXT: any;
declare var INTL_LOCALE: string;
declare var INTL_DEFAULT_LOCALE: string;
declare var INTL_SUPPORTED_LOCALE: string[] | string;
declare var INTL_LOCALE_URL_PATH: boolean | string;
declare var INTL_LOCALE_URL_PARAM: string;
declare var INTL_LOCALE_STORAGE_KEY: string;
declare var INTL_LOCALE_MATRIX_PATH: string;
declare var INTL_LOCALE_MATRIX_PARAM: string;
declare var INTL_POLYFILL: any[];
declare var INTL_RELATIVE_POLYFILL: any[];
declare var IntlPolyfill: any;
declare var INTL_VALUES: any;
declare var INTL_VALUES_VERSIONS: {
    [namespace: string]: {
        name: string;
        messages: {
            [locale: string]: {
                [key: string]: any;
            };
        };
    }[];
};
/**
 * @deprecated
 */
declare var INTL_MESSAGES: any;
/**
 * @deprecated
 */
declare var INTL_MESSAGES_VERSIONS: {
    [namespace: string]: {
        name: string;
        messages: {
            [locale: string]: {
                [key: string]: any;
            };
        };
    }[];
};
