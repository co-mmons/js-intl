"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestLocale = void 0;
const defineGlobals_1 = require("./defineGlobals");
defineGlobals_1.defineGlobals();
function bestLocale() {
    if (typeof window === "undefined" || typeof window.navigator === "undefined") {
        return INTL_DEFAULT_LOCALE;
    }
    let browserLocale = window.navigator["languages"] ? window.navigator["languages"][0] : undefined;
    browserLocale = browserLocale || window.navigator.language || window.navigator["browserLanguage"] || window.navigator["userLanguage"];
    browserLocale = browserLocale ? browserLocale.toLowerCase() : undefined;
    let urlLocale;
    const urlSegments = window.location.pathname.substring(1).split("/");
    if (urlSegments.length >= (INTL_LOCALE_URL_PATH === true ? 1 : 2)) {
        if (INTL_LOCALE_URL_PATH === true) {
            urlLocale = urlSegments[0].match(/^\W+$/g) ? undefined : urlSegments[0];
        }
        else if (urlSegments[0] == INTL_LOCALE_URL_PATH) {
            urlLocale = urlSegments[1];
        }
    }
    if (!urlLocale && INTL_LOCALE_MATRIX_PATH && INTL_LOCALE_MATRIX_PARAM) {
    }
    if (!urlLocale) {
        let queryLocaleMatch = new RegExp('[?&]' + INTL_LOCALE_URL_PARAM + '=([^&]*)').exec(window.location.search);
        urlLocale = queryLocaleMatch && decodeURIComponent(queryLocaleMatch[1].replace(/\+/g, ' ')).toLowerCase();
    }
    if (!urlLocale && INTL_LOCALE_STORAGE_KEY) {
        urlLocale = (window.localStorage && window.localStorage.getItem(INTL_LOCALE_STORAGE_KEY)) || undefined;
    }
    let bestLocale;
    if (browserLocale || urlLocale) {
        let bestLocaleRanking;
        let supported = INTL_SUPPORTED_LOCALE;
        for (const l of (typeof supported == "string" ? supported.split(",") : supported)) {
            const s = l.toLowerCase();
            if (s === urlLocale) {
                return l;
            }
            else if (s === browserLocale) {
                bestLocale = l;
                bestLocaleRanking = 20;
            }
            else if (urlLocale && (!bestLocale || bestLocaleRanking < 30) && (s.indexOf(urlLocale) === 0 || urlLocale.indexOf(s) === 0)) {
                bestLocale = l;
                bestLocaleRanking = 30;
            }
            else if (browserLocale && (!bestLocale || bestLocaleRanking < 10) && (s.indexOf(browserLocale) === 0 || browserLocale.indexOf(s) === 0)) {
                bestLocale = l;
                bestLocaleRanking = 10;
            }
        }
    }
    if (!bestLocale) {
        return INTL_DEFAULT_LOCALE;
    }
    return bestLocale;
}
exports.bestLocale = bestLocale;
//# sourceMappingURL=bestLocale.js.map