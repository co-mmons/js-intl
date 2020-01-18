"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const refs_1 = require("./refs");
exports.localeIntlBundleItem = { path: "node_modules/@umpirsky/locale-list/data/{{LOCALE}}/locales.json", type: "message", namespace: "@umpirsky/locale-list" };
/**
 * https://en.wikipedia.org/wiki/IETF-language-tag
 */
class Locale {
    constructor(codeOrPrototype) {
        this.$constructor(codeOrPrototype);
    }
    $constructor(codeOrPrototype) {
        if (typeof codeOrPrototype === "string") {
            this["code"] = codeOrPrototype;
        }
        else if (codeOrPrototype["code"] && typeof codeOrPrototype["code"] === "string") {
            this["code"] = codeOrPrototype["code"];
        }
        else {
            throw new Error("Locale code must be given in order to create Locale instance");
        }
        this["name"] = new refs_1.MessageRef("@umpirsky/locale-list", this.code.split("-").join("_"));
    }
    toString() {
        return this.code;
    }
    toJSON() {
        return this.code;
    }
    fromJSON(json) {
        if (typeof json === "string" || (json && typeof json["code"] == "string")) {
            this.$constructor(json);
        }
        else {
            throw new Error("Cannot unserialize  '" + json + "' to Locale");
        }
    }
}
Locale._codes = ["af", "af-NA", "af-ZA", "ak", "ak-GH", "sq", "sq-AL", "sq-XK", "sq-MK", "am", "am-ET", "ar", "ar-DZ", "ar-BH", "ar-TD", "ar-KM", "ar-DJ", "ar-EG", "ar-ER", "ar-IQ", "ar-IL", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MR", "ar-MA", "ar-OM", "ar-PS", "ar-QA", "ar-SA", "ar-SO", "ar-SS", "ar-SD", "ar-SY", "ar-TN", "ar-AE", "ar-EH", "ar-YE", "hy", "hy-AM", "as", "as-IN", "az", "az-AZ", "az-Cyrl-AZ", "az-Cyrl", "az-Latn-AZ", "az-Latn", "bm", "bm-Latn-ML", "bm-Latn", "eu", "eu-ES", "be", "be-BY", "bn", "bn-BD", "bn-IN", "bs", "bs-BA", "bs-Cyrl-BA", "bs-Cyrl", "bs-Latn-BA", "bs-Latn", "br", "br-FR", "bg", "bg-BG", "my", "my-MM", "ca", "ca-AD", "ca-FR", "ca-IT", "ca-ES", "zh", "zh-CN", "zh-HK", "zh-MO", "zh-Hans-CN", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hans", "zh-SG", "zh-TW", "zh-Hant-HK", "zh-Hant-MO", "zh-Hant-TW", "zh-Hant", "kw", "kw-GB", "hr", "hr-BA", "hr-HR", "cs", "cs-CZ", "da", "da-DK", "da-GL", "nl", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-NL", "nl-SX", "nl-SR", "dz", "dz-BT", "en", "en-AS", "en-AI", "en-AG", "en-AU", "en-BS", "en-BB", "en-BE", "en-BZ", "en-BM", "en-BW", "en-IO", "en-VG", "en-CM", "en-CA", "en-KY", "en-CX", "en-CC", "en-CK", "en-DG", "en-DM", "en-ER", "en-FK", "en-FJ", "en-GM", "en-GH", "en-GI", "en-GD", "en-GU", "en-GG", "en-GY", "en-HK", "en-IN", "en-IE", "en-IM", "en-JM", "en-JE", "en-KE", "en-KI", "en-LS", "en-LR", "en-MO", "en-MG", "en-MW", "en-MY", "en-MT", "en-MH", "en-MU", "en-FM", "en-MS", "en-NA", "en-NR", "en-NZ", "en-NG", "en-NU", "en-NF", "en-MP", "en-PK", "en-PW", "en-PG", "en-PH", "en-PN", "en-PR", "en-RW", "en-WS", "en-SC", "en-SL", "en-SG", "en-SX", "en-SB", "en-ZA", "en-SS", "en-SH", "en-KN", "en-LC", "en-VC", "en-SD", "en-SZ", "en-TZ", "en-TK", "en-TO", "en-TT", "en-TC", "en-TV", "en-UM", "en-VI", "en-UG", "en-GB", "en-US", "en-VU", "en-ZM", "en-ZW", "eo", "et", "et-EE", "ee", "ee-GH", "ee-TG", "fo", "fo-FO", "fi", "fi-FI", "fr", "fr-DZ", "fr-BE", "fr-BJ", "fr-BF", "fr-BI", "fr-CM", "fr-CA", "fr-CF", "fr-TD", "fr-KM", "fr-CG", "fr-CD", "fr-CI", "fr-DJ", "fr-GQ", "fr-FR", "fr-GF", "fr-PF", "fr-GA", "fr-GP", "fr-GN", "fr-HT", "fr-LU", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU", "fr-YT", "fr-MC", "fr-MA", "fr-NC", "fr-NE", "fr-RE", "fr-RW", "fr-SN", "fr-SC", "fr-BL", "fr-MF", "fr-PM", "fr-CH", "fr-SY", "fr-TG", "fr-TN", "fr-VU", "fr-WF", "ff", "ff-CM", "ff-GN", "ff-MR", "ff-SN", "gl", "gl-ES", "lg", "lg-UG", "ka", "ka-GE", "de", "de-AT", "de-BE", "de-DE", "de-LI", "de-LU", "de-CH", "el", "el-CY", "el-GR", "gu", "gu-IN", "ha", "ha-GH", "ha-Latn-GH", "ha-Latn-NE", "ha-Latn-NG", "ha-Latn", "ha-NE", "ha-NG", "he", "he-IL", "hi", "hi-IN", "hu", "hu-HU", "is", "is-IS", "ig", "ig-NG", "id", "id-ID", "ga", "ga-IE", "it", "it-IT", "it-SM", "it-CH", "ja", "ja-JP", "kl", "kl-GL", "kn", "kn-IN", "ks", "ks-Arab-IN", "ks-Arab", "ks-IN", "kk", "kk-Cyrl-KZ", "kk-Cyrl", "kk-KZ", "km", "km-KH", "ki", "ki-KE", "rw", "rw-RW", "ko", "ko-KP", "ko-KR", "ky", "ky-Cyrl-KG", "ky-Cyrl", "ky-KG", "lo", "lo-LA", "lv", "lv-LV", "ln", "ln-AO", "ln-CF", "ln-CG", "ln-CD", "lt", "lt-LT", "lu", "lu-CD", "lb", "lb-LU", "mk", "mk-MK", "mg", "mg-MG", "ms", "ms-BN", "ms-Latn-BN", "ms-Latn-MY", "ms-Latn-SG", "ms-Latn", "ms-MY", "ms-SG", "ml", "ml-IN", "mt", "mt-MT", "gv", "gv-IM", "mr", "mr-IN", "mn", "mn-Cyrl-MN", "mn-Cyrl", "mn-MN", "ne", "ne-IN", "ne-NP", "nd", "nd-ZW", "se", "se-FI", "se-NO", "se-SE", "no", "no-NO", "nb", "nb-NO", "nb-SJ", "nn", "nn-NO", "or", "or-IN", "om", "om-ET", "om-KE", "os", "os-GE", "os-RU", "ps", "ps-AF", "fa", "fa-AF", "fa-IR", "pl", "pl-PL", "pt", "pt-AO", "pt-BR", "pt-CV", "pt-GW", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL", "pa", "pa-Arab-PK", "pa-Arab", "pa-Guru-IN", "pa-Guru", "pa-IN", "pa-PK", "qu", "qu-BO", "qu-EC", "qu-PE", "ro", "ro-MD", "ro-RO", "rm", "rm-CH", "rn", "rn-BI", "ru", "ru-BY", "ru-KZ", "ru-KG", "ru-MD", "ru-RU", "ru-UA", "sg", "sg-CF", "gd", "gd-GB", "sr", "sr-BA", "sr-Cyrl-BA", "sr-Cyrl-XK", "sr-Cyrl-ME", "sr-Cyrl-RS", "sr-Cyrl", "sr-XK", "sr-Latn-BA", "sr-Latn-XK", "sr-Latn-ME", "sr-Latn-RS", "sr-Latn", "sr-ME", "sr-RS", "sh", "sh-BA", "sn", "sn-ZW", "ii", "ii-CN", "si", "si-LK", "sk", "sk-SK", "sl", "sl-SI", "so", "so-DJ", "so-ET", "so-KE", "so-SO", "es", "es-AR", "es-BO", "es-IC", "es-EA", "es-CL", "es-CO", "es-CR", "es-CU", "es-DO", "es-EC", "es-SV", "es-GQ", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PY", "es-PE", "es-PH", "es-PR", "es-ES", "es-US", "es-UY", "es-VE", "sw", "sw-KE", "sw-TZ", "sw-UG", "sv", "sv-AX", "sv-FI", "sv-SE", "tl", "tl-PH", "ta", "ta-IN", "ta-MY", "ta-SG", "ta-LK", "te", "te-IN", "th", "th-TH", "bo", "bo-CN", "bo-IN", "ti", "ti-ER", "ti-ET", "to", "to-TO", "tr", "tr-CY", "tr-TR", "uk", "uk-UA", "ur", "ur-IN", "ur-PK", "ug", "ug-Arab-CN", "ug-Arab", "ug-CN", "uz", "uz-AF", "uz-Arab-AF", "uz-Arab", "uz-Cyrl-UZ", "uz-Cyrl", "uz-Latn-UZ", "uz-Latn", "uz-UZ", "vi", "vi-VN", "cy", "cy-GB", "fy", "fy-NL", "yi", "yo", "yo-BJ", "yo-NG", "zu", "zu-ZA"];
Locale._languages = ["aa", "ab", "ae", "af", "ak", "am", "an", "ar", "as", "av", "ay", "az", "ba", "be", "bg", "bh", "bi", "bm", "bn", "bo", "br", "bs", "ca", "ce", "ch", "co", "cr", "cs", "cu", "cv", "cy", "da", "de", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", "fi", "fj", "fo", "fr", "fy", "ga", "gd", "gl", "gn", "gu", "gv", "ha", "he", "hi", "ho", "hr", "ht", "hu", "hy", "hz", "ia", "id", "ie", "ig", "ii", "ik", "io", "is", "it", "iu", "ja", "jv", "ka", "kg", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ku", "kv", "kw", "ky", "la", "lb", "lg", "li", "ln", "lo", "lt", "lu", "lv", "mg", "mh", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "na", "nb", "nd", "ne", "ng", "nl", "nn", "no", "nr", "nv", "ny", "oc", "oj", "om", "or", "os", "pa", "pi", "pl", "ps", "pt", "qu", "rm", "rn", "ro", "ru", "rw", "sa", "sc", "sd", "se", "sg", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "wa", "wo", "xh", "yi", "yo", "za", "zh", "zu"];
exports.Locale = Locale;
//# sourceMappingURL=locale.js.map