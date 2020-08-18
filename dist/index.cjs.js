'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var json = require('@co.mmons/js-utils/json');
var core = require('@co.mmons/js-utils/core');
var bignumber_js = require('bignumber.js');
var IntlMessageFormat = require('intl-messageformat');
var dateFns = require('date-fns');
var serializers = require('@co.mmons/js-utils/json/serializers');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var IntlMessageFormat__default = /*#__PURE__*/_interopDefaultLegacy(IntlMessageFormat);

exports.IntlRef = class IntlRef {
    constructor(type) {
        this.refType = type;
        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }
};
exports.IntlRef = tslib.__decorate([
    json.serializable(),
    tslib.__metadata("design:paramtypes", [String])
], exports.IntlRef);

var MessageRef_1;
exports.MessageRef = MessageRef_1 = class MessageRef extends exports.IntlRef {
    constructor(namespace, key, values, formats) {
        super("message");
        this.namespace = namespace;
        this.key = key;
        this.values = values;
        this.formats = formats;
    }
    static fromJSON(json) {
        if (typeof json === "string") {
            const namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                return new MessageRef_1(namespaceKey[0], namespaceKey[1]);
            }
            else {
                return new MessageRef_1(undefined, json);
            }
        }
        else if (Array.isArray(json) && json.length > 0) {
            const namespace = json.length > 1 ? json[0] : undefined;
            const key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            const values = json.length == 3 && json[2];
            const formats = json.length == 4 && json[3];
            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                return new MessageRef_1(namespace, key, values, formats);
            }
        }
        else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            return new MessageRef_1((typeof json.namespace === "string" && json.namespace) || undefined, json.key, typeof json.values === "object" ? json.values : undefined, json.formats);
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/MessageRef`);
    }
    toJSON() {
        const json$1 = {
            "@type": MessageRef_1.jsonTypeName,
            key: this.key
        };
        if (this.namespace) {
            json$1.type = this.namespace;
        }
        if (this.values) {
            json$1.values = json.serialize(this.values);
        }
        return json$1;
    }
    toString() {
        return this.key;
    }
};
exports.MessageRef.jsonTypeName = "intl/MessageRef";
exports.MessageRef = MessageRef_1 = tslib.__decorate([
    json.subtype(exports.IntlRef, "refType", "message"),
    tslib.__metadata("design:paramtypes", [String, String, Object, Object])
], exports.MessageRef);

class Country {
    constructor(codeOrPrototype) {
        if (typeof codeOrPrototype === "string") {
            this.code = codeOrPrototype;
        }
        else if (codeOrPrototype.code && typeof codeOrPrototype.code === "string") {
            this.code = codeOrPrototype.code;
        }
        else {
            throw new Error("Country code must be given in order to create Country instance");
        }
        if (this.code.length == 3) {
            for (let a in Country._iso) {
                let c = Country._iso[a];
                if (c == this.code) {
                    this["code"] = a;
                    break;
                }
            }
        }
        this.name = new exports.MessageRef("@umpirsky/country-list", this.code);
    }
    static fromJSON(json) {
        if (typeof json === "string" || (json && typeof json["code"] === "string")) {
            return new Country(json);
        }
        else {
            throw new Error("Cannot unserialize '" + json + "' to Country");
        }
    }
    static codes() {
        return Country._codes.slice();
    }
    static countries() {
        let cntrs = [];
        for (let c of Country._codes) {
            let i = new Country(c);
            cntrs.push(i);
        }
        return cntrs;
    }
    get alpha2() {
        return this.code;
    }
    get alpha3() {
        return Country._iso[this.code];
    }
    equals(country) {
        return this.code === (country && country.code);
    }
    toString() {
        return this.code;
    }
    toJSON() {
        return { "@type": Country.jsonTypeName, code: this.code };
    }
}
Country._iso = { "AF": "AFG", "AX": "ALA", "AL": "ALB", "DZ": "DZA", "AS": "ASM", "AD": "AND", "AO": "AGO", "AI": "AIA", "AQ": "ATA", "AG": "ATG", "AR": "ARG", "AM": "ARM", "AW": "ABW", "AU": "AUS", "AT": "AUT", "AZ": "AZE", "BS": "BHS", "BH": "BHR", "BD": "BGD", "BB": "BRB", "BY": "BLR", "BE": "BEL", "BZ": "BLZ", "BJ": "BEN", "BM": "BMU", "BT": "BTN", "BO": "BOL", "BQ": "BES", "BA": "BIH", "BW": "BWA", "BR": "BRA", "IO": "IOT", "BN": "BRN", "BG": "BGR", "BF": "BFA", "BI": "BDI", "KH": "KHM", "CM": "CMR", "CA": "CAN", "CV": "CPV", "KY": "CYM", "CF": "CAF", "TD": "TCD", "CL": "CHL", "CN": "CHN", "CX": "CXR", "CC": "CCK", "CO": "COL", "KM": "COM", "CG": "COG", "CD": "COD", "CK": "COK", "CR": "CRI", "CI": "CIV", "HR": "HRV", "CU": "CUB", "CW": "CUW", "CY": "CYP", "CZ": "CZE", "DK": "DNK", "DJ": "DJI", "DM": "DMA", "DO": "DOM", "EC": "ECU", "EG": "EGY", "SV": "SLV", "GQ": "GNQ", "ER": "ERI", "EE": "EST", "ET": "ETH", "FK": "FLK", "FO": "FRO", "FJ": "FJI", "FI": "FIN", "FR": "FRA", "GF": "GUF", "PF": "PYF", "TF": "ATF", "GA": "GAB", "GM": "GMB", "GE": "GEO", "DE": "DEU", "GH": "GHA", "GI": "GIB", "GR": "GRC", "GL": "GRL", "GD": "GRD", "GP": "GLP", "GU": "GUM", "GT": "GTM", "GG": "GGY", "GN": "GIN", "GW": "GNB", "GY": "GUY", "HT": "HTI", "VA": "VAT", "HN": "HND", "HK": "HKG", "HU": "HUN", "IS": "ISL", "IN": "IND", "ID": "IDN", "IR": "IRN", "IQ": "IRQ", "IE": "IRL", "IM": "IMN", "IL": "ISR", "IT": "ITA", "JM": "JAM", "JP": "JPN", "JE": "JEY", "JO": "JOR", "KZ": "KAZ", "KE": "KEN", "KI": "KIR", "KP": "PRK", "KR": "KOR", "KW": "KWT", "KG": "KGZ", "LA": "LAO", "LV": "LVA", "LB": "LBN", "LS": "LSO", "LR": "LBR", "LY": "LBY", "LI": "LIE", "LT": "LTU", "LU": "LUX", "MO": "MAC", "MK": "MKD", "MG": "MDG", "MW": "MWI", "MY": "MYS", "MV": "MDV", "ML": "MLI", "MT": "MLT", "MH": "MHL", "MQ": "MTQ", "MR": "MRT", "MU": "MUS", "YT": "MYT", "MX": "MEX", "FM": "FSM", "MD": "MDA", "MC": "MCO", "MN": "MNG", "ME": "MNE", "MS": "MSR", "MA": "MAR", "MZ": "MOZ", "MM": "MMR", "NA": "NAM", "NR": "NRU", "NP": "NPL", "NL": "NLD", "NC": "NCL", "NZ": "NZL", "NI": "NIC", "NE": "NER", "NG": "NGA", "NU": "NIU", "NF": "NFK", "MP": "MNP", "NO": "NOR", "OM": "OMN", "PK": "PAK", "PW": "PLW", "PS": "PSE", "PA": "PAN", "PG": "PNG", "PY": "PRY", "PE": "PER", "PH": "PHL", "PN": "PCN", "PL": "POL", "PT": "PRT", "PR": "PRI", "QA": "QAT", "RE": "REU", "RO": "ROU", "RU": "RUS", "RW": "RWA", "BL": "BLM", "SH": "SHN", "KN": "KNA", "LC": "LCA", "MF": "MAF", "PM": "SPM", "VC": "VCT", "WS": "WSM", "SM": "SMR", "ST": "STP", "SA": "SAU", "SN": "SEN", "RS": "SRB", "SC": "SYC", "SL": "SLE", "SG": "SGP", "SX": "SXM", "SK": "SVK", "SI": "SVN", "SB": "SLB", "SO": "SOM", "ZA": "ZAF", "GS": "SGS", "SS": "SSD", "ES": "ESP", "LK": "LKA", "SD": "SDN", "SR": "SUR", "SJ": "SJM", "SZ": "SWZ", "SE": "SWE", "CH": "CHE", "SY": "SYR", "TW": "TWN", "TJ": "TJK", "TZ": "TZA", "TH": "THA", "TL": "TLS", "TG": "TGO", "TK": "TKL", "TO": "TON", "TT": "TTO", "TN": "TUN", "TR": "TUR", "TM": "TKM", "TC": "TCA", "TV": "TUV", "UG": "UGA", "UA": "UKR", "AE": "ARE", "GB": "GBR", "US": "USA", "UM": "UMI", "UY": "URY", "UZ": "UZB", "VU": "VUT", "VE": "VEN", "VN": "VNM", "VG": "VGB", "VI": "VIR", "WF": "WLF", "EH": "ESH", "YE": "YEM", "ZM": "ZMB", "ZW": "ZWE" };
Country._codes = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"];
Country.jsonTypeName = "intl/Country";

class Currency {
    constructor(codeOrPrototype) {
        if (typeof codeOrPrototype === "string") {
            this.code = codeOrPrototype;
        }
        else if (codeOrPrototype.code && typeof codeOrPrototype.code === "string") {
            this.code = codeOrPrototype.code;
        }
        else {
            throw new Error("Currency code must be given in order to create Currency instance");
        }
    }
    static codes() {
        return Currency._codes.slice();
    }
    static fromJSON(json) {
        if (typeof json === "string") {
            return new Currency(json);
        }
        else if (json && typeof json["code"] === "string") {
            return new Currency(json);
        }
        else {
            throw new Error("Cannot unserialize '" + json + "' to Currency instance");
        }
    }
    toString() {
        return this.code;
    }
    toJSON() {
        return { "@type": Currency.jsonTypeName, code: this.code };
    }
}
Currency._codes = ["AFN", "EUR", "ALL", "DZD", "USD", "EUR", "AOA", "XCD", "", "XCD", "ARS", "AMD", "AWG", "AUD", "EUR", "AZN", "BSD", "BHD", "BDT", "BBD", "BYN", "EUR", "BZD", "XOF", "BMD", "INR", "BTN", "BOB", "BOV", "USD", "BAM", "BWP", "NOK", "BRL", "USD", "BND", "BGN", "XOF", "BIF", "CVE", "KHR", "XAF", "CAD", "KYD", "XAF", "XAF", "CLP", "CLF", "CNY", "AUD", "AUD", "COP", "COU", "KMF", "CDF", "XAF", "NZD", "CRC", "XOF", "HRK", "CUP", "CUC", "ANG", "EUR", "CZK", "DKK", "DJF", "XCD", "DOP", "USD", "EGP", "SVC", "USD", "XAF", "ERN", "EUR", "ETB", "EUR", "FKP", "DKK", "FJD", "EUR", "EUR", "EUR", "XPF", "EUR", "XAF", "GMD", "GEL", "EUR", "GHS", "GIP", "EUR", "DKK", "XCD", "EUR", "USD", "GTQ", "GBP", "GNF", "XOF", "GYD", "HTG", "USD", "AUD", "EUR", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "XDR", "IRR", "IQD", "EUR", "GBP", "ILS", "EUR", "JMD", "JPY", "GBP", "JOD", "KZT", "KES", "AUD", "KPW", "KRW", "KWD", "KGS", "LAK", "EUR", "LBP", "LSL", "ZAR", "LRD", "LYD", "CHF", "EUR", "EUR", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "XOF", "EUR", "USD", "EUR", "MRO", "MUR", "EUR", "XUA", "MXN", "MXV", "USD", "MDL", "EUR", "MNT", "EUR", "XCD", "MAD", "MZN", "MMK", "NAD", "ZAR", "AUD", "NPR", "EUR", "XPF", "NZD", "NIO", "XOF", "NGN", "NZD", "AUD", "USD", "NOK", "OMR", "PKR", "USD", "", "PAB", "USD", "PGK", "PYG", "PEN", "PHP", "NZD", "PLN", "EUR", "USD", "QAR", "EUR", "RON", "RUB", "RWF", "EUR", "SHP", "XCD", "XCD", "EUR", "EUR", "XCD", "WST", "EUR", "STD", "SAR", "XOF", "RSD", "SCR", "SLL", "SGD", "ANG", "XSU", "EUR", "EUR", "SBD", "SOS", "ZAR", "", "SSP", "EUR", "LKR", "SDG", "SRD", "NOK", "SZL", "SEK", "CHF", "CHE", "CHW", "SYP", "TWD", "TJS", "TZS", "THB", "USD", "XOF", "NZD", "TOP", "TTD", "TND", "TRY", "TMT", "USD", "AUD", "UGX", "UAH", "AED", "GBP", "USD", "USD", "USN", "UYU", "UYI", "UZS", "VUV", "VEF", "VND", "USD", "USD", "XPF", "MAD", "YER", "ZMW", "ZWL", "XBA", "XBB", "XBC", "XBD", "XTS", "XXX", "XAU", "XPD", "XPT", "XAG", "AFA", "FIM", "ALK", "ADP", "ESP", "FRF", "AOK", "AON", "AOR", "ARA", "ARP", "ARY", "RUR", "ATS", "AYM", "AZM", "RUR", "BYR", "BYB", "RUR", "BEC", "BEF", "BEL", "BOP", "BAD", "BRB", "BRC", "BRE", "BRN", "BRR", "BGJ", "BGK", "BGL", "BUK", "CNX", "HRD", "HRK", "CYP", "CSJ", "CSK", "ECS", "ECV", "GQE", "EEK", "XEU", "FIM", "FRF", "FRF", "FRF", "GEK", "RUR", "DDM", "DEM", "GHC", "GHP", "GRD", "FRF", "GNE", "GNS", "GWE", "GWP", "ITL", "ISJ", "IEP", "ILP", "ILR", "ITL", "RUR", "RUR", "LAJ", "LVL", "LVR", "LSM", "ZAL", "LTL", "LTT", "LUC", "LUF", "LUL", "MGF", "MWK", "MVQ", "MLF", "MTL", "MTP", "FRF", "FRF", "MXP", "RUR", "FRF", "MZE", "MZM", "NLG", "ANG", "NIC", "PEN", "PEH", "PEI", "PES", "PLZ", "PTE", "FRF", "ROK", "RON", "ROL", "RUR", "FRF", "FRF", "FRF", "ITL", "CSD", "EUR", "SKK", "SIT", "ZAL", "SDG", "RHD", "ESA", "ESB", "ESP", "SDD", "SDP", "SRG", "CHC", "RUR", "TJR", "IDR", "TPE", "TRL", "TRY", "RUR", "TMM", "UGS", "UGW", "UAK", "SUR", "USS", "UYN", "UYP", "RUR", "VEB", "VEF", "VEF", "VNC", "YDD", "YUD", "YUM", "YUN", "ZRN", "ZRZ", "ZMK", "ZWC", "ZWD", "ZWD", "ZWN", "ZWR", "XFO", "XRE", "XFU"];
Currency.jsonTypeName = "intl/Currency";

var DecimalFormatRef_1;
exports.DecimalFormatRef = DecimalFormatRef_1 = class DecimalFormatRef extends exports.IntlRef {
    constructor(value, predefinedOptionsOrOptions, additionalOptions) {
        super("decimalFormat");
        this.value = typeof value === "number" ? new bignumber_js.BigNumber(value) : value;
        this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
    }
    static fromJSON(json) {
        if (typeof json === "object" && json.value && (typeof json.value === "string" || typeof json.value === "number")) {
            return new DecimalFormatRef_1(new bignumber_js.BigNumber(json.value), typeof json.predefined === "string" ? json.predefined : undefined, typeof json.predefined === "object" ? json.options : undefined);
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/DecimalFormatRef`);
    }
    toJSON() {
        const json$1 = {
            "@type": DecimalFormatRef_1.jsonTypeName,
            value: json.serialize(this.value)
        };
        if (this.options) {
            json$1.options = json.serialize(this.options);
        }
        if (this.predefined) {
            json$1.predefined = this.predefined;
        }
        return json$1;
    }
};
exports.DecimalFormatRef.jsonTypeName = "intl/DecimalFormatRef";
exports.DecimalFormatRef = DecimalFormatRef_1 = tslib.__decorate([
    json.subtype(exports.IntlRef, "refType", "decimalFormat"),
    tslib.__metadata("design:paramtypes", [Object, Object, Object])
], exports.DecimalFormatRef);

for (const v of ["INTL_LOCALE", "INTL_DEFAULT_LOCALE", "INTL_SUPPORTED_LOCALE", "INTL_LOCALE_URL_PARAM", "INTL_LOCALE_URL_PATH", "INTL_LOCALE_STORAGE_KEY"]) {
    if (typeof window !== "undefined" && !window[v]) {
        window[v] = undefined;
    }
    if (typeof global !== "undefined" && !global[v]) {
        global[v] = undefined;
    }
}

if (typeof window !== "undefined" && !window["INTL_MESSAGES"]) {
    window["INTL_MESSAGES"] = {};
}
if (typeof global !== "undefined" && !global["INTL_MESSAGES"]) {
    global["INTL_MESSAGES"] = {};
}
const importedResources = [];
function importMessages(url) {
    if (importedResources.indexOf(url) > -1) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onerror = () => {
            reject(new Error(request.statusText));
        };
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                importedResources.push(url);
                try {
                    let json = JSON.parse(request.responseText);
                    if (json) {
                        for (let namespace in json) {
                            INTL_MESSAGES[namespace] = INTL_MESSAGES[namespace] || {};
                            for (let locale in json[namespace] || {}) {
                                INTL_MESSAGES[namespace][locale] = INTL_MESSAGES[namespace][locale] || {};
                                for (let key in json[namespace][locale] || {}) {
                                    INTL_MESSAGES[namespace][locale][key] = json[namespace][locale][key];
                                }
                            }
                        }
                    }
                    resolve();
                }
                catch (error) {
                    reject(new Error(error));
                }
            }
            else {
                reject(new Error(request.statusText));
            }
        };
        request.open("GET", url);
        request.send();
    });
}
function pushMessages(locale, namespace, messages) {
    if (!INTL_MESSAGES[namespace]) {
        INTL_MESSAGES[namespace] = {};
    }
    if (!INTL_MESSAGES[namespace][locale]) {
        INTL_MESSAGES[namespace][locale] = {};
    }
    Object.assign(INTL_MESSAGES[namespace][locale], messages);
}
function findMessage(locales, namespace, key) {
    for (let locale of locales) {
        if (INTL_MESSAGES && INTL_MESSAGES[namespace] && INTL_MESSAGES[namespace][locale] && INTL_MESSAGES[namespace][locale][key]) {
            return INTL_MESSAGES[namespace][locale][key];
        }
    }
    return key.replace(/.+\//g, "").replace(/\|.*/g, "").trim();
}
function isMessageNeedsFormatter(message) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}
function extractMessageNamespaceAndKey(namespaceAndKey, defaultNamespace) {
    let result = { namespace: undefined, key: undefined };
    if (namespaceAndKey instanceof exports.MessageRef) {
        result.namespace = namespaceAndKey.namespace || defaultNamespace;
        result.key = namespaceAndKey.key;
    }
    else if (namespaceAndKey[0] == "#") {
        result.namespace = defaultNamespace;
        result.key = namespaceAndKey.substring(1);
    }
    else {
        let dot = namespaceAndKey.indexOf("#");
        if (dot > -1) {
            result.namespace = namespaceAndKey.substring(0, dot);
            result.key = namespaceAndKey.substring(dot + 1);
        }
        else {
            result.namespace = defaultNamespace;
            result.key = namespaceAndKey;
        }
    }
    return result;
}

function toBigNumber(value) {
    if (value instanceof bignumber_js.BigNumber) {
        return value;
    }
    else if (typeof value === "number") {
        return new bignumber_js.BigNumber(value);
    }
    else if (typeof value === "string") {
        return new bignumber_js.BigNumber(value);
    }
    else {
        throw new Error("Value '" + value + "' cannot be converted to BigNumber.");
    }
}
class Money {
    constructor(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof Currency || typeof currencyOrPrototype === "string") {
            this.currency = currencyOrPrototype instanceof Currency ? currencyOrPrototype : new Currency(currencyOrPrototype);
            this.amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this.amount = toBigNumber(currencyOrPrototype.amount);
            this.currency = currencyOrPrototype.currency instanceof Currency ? currencyOrPrototype.currency : new Currency(currencyOrPrototype.currency);
        }
    }
    static fromJSON(json) {
        if (typeof json === "string") {
            return new Money(json.substr(0, 3), json.substr(3));
        }
        else if (Array.isArray(json)) {
            if (json.length === 2 && typeof json[0] === "string" && (typeof json[1] === "string" || typeof json[1] === "number")) {
                const currency = json[0];
                let amount = json[1];
                return new Money(json[0], json[1]);
            }
        }
        else if (json && json.currency && json.amount) {
            return new Money(json.currency, json.amount);
        }
        throw new Error("Cannot unserialize '" + json + "' to Money");
    }
    plus(amount) {
        return new Money(this.currency, this.amount.plus(amount));
    }
    minus(amount) {
        return new Money(this.currency, this.amount.minus(amount));
    }
    times(amount) {
        return new Money(this.currency, this.amount.times(amount));
    }
    dividedBy(amount) {
        return new Money(this.currency, this.amount.dividedBy(amount));
    }
    decimalPlaces(dp, roundingMode) {
        return new Money(this.currency, this.amount.decimalPlaces(dp, roundingMode));
    }
    comparedTo(money) {
        return this.compareTo(money);
    }
    compareTo(money) {
        if (typeof money === "number")
            return this.amount.comparedTo(money);
        else if (money instanceof bignumber_js.BigNumber)
            return this.amount.comparedTo(money);
        else if (money)
            return this.amount.comparedTo(money.amount);
        else
            throw new Error("Cannot compare empty value");
    }
    toJSON() {
        return { "@type": Money.jsonTypeName, currency: this.currency.code, amount: this.amount.toString() };
    }
    toString() {
        return this.currency.code + this.amount.toString();
    }
}
Money.jsonTypeName = "intl/Money";

function selectUnit(from, to = Date.now(), thresholds = DEFAULT_THRESHOLDS) {
    const secs = dateFns.differenceInSeconds(from, to);
    if (Math.abs(secs) < thresholds.second) {
        return {
            value: Math.round(secs),
            unit: "second"
        };
    }
    const mins = secs / 60;
    if (Math.abs(mins) < thresholds.minute) {
        return {
            value: Math.round(mins),
            unit: "minute"
        };
    }
    const hours = mins / 60;
    if (Math.abs(hours) < thresholds.hour) {
        return {
            value: Math.round(hours),
            unit: "hour"
        };
    }
    const days = dateFns.differenceInCalendarDays(from, to);
    if (Math.abs(days) < thresholds.day) {
        return {
            value: Math.round(days),
            unit: "day"
        };
    }
    const weeks = dateFns.differenceInCalendarWeeks(from, to);
    if (Math.abs(weeks) < thresholds.week) {
        return {
            value: Math.round(weeks),
            unit: "week"
        };
    }
    const months = dateFns.differenceInCalendarMonths(from, to);
    if (Math.abs(months) < thresholds.month) {
        return {
            value: Math.round(months),
            unit: "month"
        };
    }
    const quarters = dateFns.differenceInCalendarQuarters(from, to);
    if (Math.abs(quarters) < thresholds.quarter) {
        return {
            value: Math.round(quarters),
            unit: "quarter"
        };
    }
    const years = dateFns.differenceInCalendarYears(from, to);
    if (Math.abs(years) > 0) {
        return {
            value: Math.round(years),
            unit: "year"
        };
    }
}
const DEFAULT_THRESHOLDS = {
    second: 45,
    minute: 45,
    hour: 22,
    day: 7,
    week: 4,
    month: 12,
    quarter: 0 // quarters to year
};

for (const v of ["INTL_POLYFILL", "INTL_RELATIVE_POLYFILL", "IntlPolyfill"]) {
    if (typeof window !== "undefined" && !window[v]) {
        window[v] = undefined;
    }
    if (typeof global !== "undefined" && !global[v]) {
        global[v] = undefined;
    }
}
function loadPolyfillsLocale() {
    if (INTL_POLYFILL && INTL_POLYFILL.length && IntlPolyfill) {
        for (const a of INTL_POLYFILL) {
            IntlPolyfill.__addLocaleData(a);
        }
        INTL_POLYFILL = [];
    }
    if (INTL_RELATIVE_POLYFILL && INTL_RELATIVE_POLYFILL.length && Intl["RelativeTimeFormat"] && Intl["RelativeTimeFormat"].__addLocaleData) {
        for (const a of INTL_RELATIVE_POLYFILL) {
            Intl["RelativeTimeFormat"].__addLocaleData(a);
        }
        INTL_RELATIVE_POLYFILL = [];
    }
}
loadPolyfillsLocale();
const defaultMessageFormat = new IntlMessageFormat__default['default']("", "en");
class IntlHelper {
    constructor(defaultLocale, defaultNamespace) {
        this.defaultNamespace = defaultNamespace;
        this.useCache = true;
        this.namespaceAliases = {};
        this.formatters = {};
        this.formattersOptions = {};
        this.locale = defaultLocale;
        this.defaultNamespace = defaultNamespace;
        loadPolyfillsLocale();
    }
    setResourcesLocation(location) {
        this.resourcesLocation = location;
    }
    setDefaultNamespace(namespace) {
        this.defaultNamespace = namespace;
    }
    addNamespaceAlias(namespace, alias) {
        this.namespaceAliases[alias] = namespace;
    }
    get locale() {
        return this._locale;
    }
    set locale(locale) {
        this._locale = locale || INTL_LOCALE || INTL_DEFAULT_LOCALE || "en-US";
        this._locales = [];
        let segments = this._locale.split("-");
        for (let i = 0; i < segments.length; i++) {
            this._locales.push(segments.slice(0, i + 1).join("-"));
        }
        this.formatters = {};
    }
    setLocale(locale) {
        this.locale = locale;
        return this;
    }
    get locales() {
        if (this._locales) {
            return this._locales.slice();
        }
        return [];
    }
    formatterInstance(formatterConstructor, id, constructorArguments) {
        let cacheKey = id ? `${formatterConstructor.name}_${id}` : getCacheId([formatterConstructor.name].concat(constructorArguments));
        let formatter = this.formatters[cacheKey];
        if (!formatter && constructorArguments) {
            if (formatterConstructor === IntlMessageFormat__default['default'] && !isMessageNeedsFormatter(constructorArguments[0])) {
                formatter = defaultMessageFormat;
            }
            else if (formatterConstructor === Intl["RelativeTimeFormat"]) {
                formatter = new Intl["RelativeTimeFormat"](this._locales, constructorArguments[0]);
            }
            else if (formatterConstructor === Intl.DateTimeFormat) {
                formatter = new Intl.DateTimeFormat(this._locales, constructorArguments[0]);
            }
            else if (formatterConstructor === Intl.NumberFormat) {
                formatter = new Intl.NumberFormat(this._locales, constructorArguments[0]);
            }
            this.formatters[cacheKey] = formatter;
        }
        return formatter;
    }
    formatterInstanceExists(formatter, id) {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        id = `${formatterName}_${id}`;
        return id in this.formatters[id];
    }
    addFormatterPredefinedOptions(formatter, key, options) {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        if (!this.formattersOptions[formatterName]) {
            this.formattersOptions[formatterName] = {};
        }
        this.formattersOptions[formatterName][key] = options;
    }
    addDateTimePredefinedOptions(key, options) {
        this.addFormatterPredefinedOptions(Intl.DateTimeFormat.name, key, options);
    }
    findFormatterPredefinedOptions(formatter, key) {
        let formatterName = typeof formatter === "string" ? formatter : formatter.name;
        if (this.formattersOptions[formatterName]) {
            return this.formattersOptions[formatterName][key];
        }
        return undefined;
    }
    value(value) {
        if (!value) {
            return;
        }
        for (let locale of this._locales) {
            if (value[locale]) {
                return value[locale];
            }
        }
    }
    async messagesImport(resourcePath) {
        await importMessages(`${this.resourcesLocation}/${resourcePath}/${this.locale}.json`);
    }
    messageFormat(message, values, formats) {
        return new IntlMessageFormat__default['default'](message, this._locale, formats).format(values);
    }
    message(key, values, formats) {
        const message = this.messageImpl(Array.isArray(key) ? (key.length > 0 ? key[0] : "") : key, values, formats);
        if (typeof message === "string") {
            return message;
        }
        else if (message) {
            throw new Error("External message, use asyncMessage()");
        }
        else {
            return undefined;
        }
    }
    asyncMessage(key, values, formats) {
        const message = this.messageImpl(key, values, formats);
        if (typeof message === "string") {
            return Promise.resolve(message);
        }
        else {
            return message;
        }
    }
    messageImpl(key, values, formats) {
        let namespaceAndKey = extractMessageNamespaceAndKey(key, this.defaultNamespace);
        if (!namespaceAndKey.namespace) {
            return namespaceAndKey.key;
        }
        if (key instanceof exports.MessageRef) {
            if (!values) {
                values = key.values;
            }
            if (!formats) {
                formats = key.formats;
            }
        }
        if (values) {
            const fixedValues = {};
            for (const key of Object.keys(values)) {
                if (values[key] instanceof exports.MessageRef) {
                    fixedValues[key] = this.message(values[key]);
                }
                else if (values[key] instanceof exports.DecimalFormatRef) {
                    fixedValues[key] = this.decimalFormat(values[key]);
                }
                else {
                    fixedValues[key] = values[key];
                }
            }
            values = fixedValues;
        }
        let formatter = this.formatterInstance(IntlMessageFormat__default['default'], `${namespaceAndKey.namespace},${namespaceAndKey.key}`);
        if (formatter && formatter !== defaultMessageFormat && !formats) {
            return formatter.format(values);
        }
        let message = findMessage(this._locales, namespaceAndKey.namespace, namespaceAndKey.key);
        if (typeof message == "string") {
            formatter = this.formatterInstance(IntlMessageFormat__default['default'], `${namespaceAndKey.namespace},${namespaceAndKey.key}`, [message]);
            if (formatter !== defaultMessageFormat) {
                formatter = new IntlMessageFormat__default['default'](message, this._locale, formats);
            }
            if (formatter && formatter !== defaultMessageFormat) {
                return formatter.format(values);
            }
            else {
                return message;
            }
        }
        // value is stored in a file
        else if (message && message.file) {
            return new Promise(async (resolve, reject) => {
                let contents;
                try {
                    contents = await this.readFile(message.file);
                }
                catch (error) {
                    reject(error);
                    return;
                }
                formatter = new IntlMessageFormat__default['default'](contents, this._locale, formats);
                resolve(formatter.format(values));
            });
        }
    }
    readFile(file) {
        return new Promise((resolve, reject) => {
            if (this.resourcesLocation) {
                let url = `${this.resourcesLocation}/${file}`;
                let xhr = new XMLHttpRequest();
                xhr.onerror = (error) => {
                    reject(error);
                };
                xhr.ontimeout = () => {
                    reject(new Error(`Timeout when fetching intl resource ${url}`));
                };
                xhr.onload = () => {
                    resolve(xhr.responseText);
                };
                xhr.open("GET", url, true);
                xhr.send();
            }
            else if (this.resourcesLocation && this.resourcesLocation.startsWith("./") || this.resourcesLocation.startsWith("/")) ;
            else {
                reject(new Error(`Not able to read intl resource file ${file}`));
            }
        });
    }
    relativeFormat(dateTime, options) {
        if (typeof dateTime === "number") {
            dateTime = new Date(dateTime);
        }
        else if (dateTime instanceof core.DateTimezone) {
            dateTime = dateTime.date;
        }
        if (dateTime === null || dateTime === undefined) {
            dateTime = new Date();
        }
        const diff = selectUnit(dateTime);
        return this.formatterInstance(Intl["RelativeTimeFormat"], undefined, [Object.assign({ numeric: "auto" }, options)]).format(diff.value, diff.unit);
    }
    dateFormat(dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("date", dateTime, predefinedOptionsOrOptions, options);
    }
    timeFormat(dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("time", dateTime, predefinedOptionsOrOptions, options);
    }
    dateTimeFormat(dateTime, predefinedOptionsOrOptions, options) {
        return this.dateTimeFormatImpl("dateTime", dateTime, predefinedOptionsOrOptions, options);
    }
    dateTimeFormatImpl(mode, dateTime, predefinedOptionsOrOptions, options) {
        let predefinedOptions = typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.DateTimeFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions;
        predefinedOptions = Object.assign({}, predefinedOptions, options);
        if (mode == "time") {
            predefinedOptions.year = undefined;
            predefinedOptions.month = undefined;
            predefinedOptions.day = undefined;
            predefinedOptions.weekday = undefined;
            predefinedOptions.era = undefined;
            if (!predefinedOptions.hour && !predefinedOptions.minute && !predefinedOptions.second && !predefinedOptions.timeZoneName) {
                predefinedOptions.hour = "2-digit";
                predefinedOptions.minute = "2-digit";
                predefinedOptions.second = "2-digit";
            }
        }
        else if (mode == "date") {
            predefinedOptions.hour = undefined;
            predefinedOptions.minute = undefined;
            predefinedOptions.second = undefined;
            if (!predefinedOptions.year && !predefinedOptions.month && !predefinedOptions.day && !predefinedOptions.weekday && !predefinedOptions.era && !predefinedOptions.timeZoneName) {
                predefinedOptions.year = "numeric";
                predefinedOptions.month = "numeric";
                predefinedOptions.day = "numeric";
            }
        }
        else {
            predefinedOptions = Object.assign({ year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }, predefinedOptions);
        }
        if (dateTime instanceof core.DateTimezone) {
            if (!dateTime.timezone) {
                predefinedOptions.timeZone = "UTC";
                predefinedOptions.timeZoneName = undefined;
            }
            else if (dateTime.timezone !== "current") {
                predefinedOptions.timeZone = dateTime.timezone;
            }
            dateTime = dateTime.date;
        }
        const formatter = this.formatterInstance(Intl.DateTimeFormat, undefined, [predefinedOptions]);
        return formatter.format(dateTime);
    }
    currencyFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("currency", value, predefinedOptionsOrOptions, additionalOptions);
    }
    decimalFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        if (value instanceof exports.DecimalFormatRef) {
            return this.numberFormatImpl("decimal", value.value, value.predefined, value.options);
        }
        return this.numberFormatImpl("decimal", value, predefinedOptionsOrOptions, additionalOptions);
    }
    percentFormat(value, predefinedOptionsOrOptions, additionalOptions) {
        return this.numberFormatImpl("percent", value, predefinedOptionsOrOptions, additionalOptions);
    }
    numberFormatImpl(mode, value, predefinedOptionsOrOptions, additionalOptions) {
        let options = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? this.findFormatterPredefinedOptions(Intl.NumberFormat.name, predefinedOptionsOrOptions) : predefinedOptionsOrOptions, additionalOptions);
        if (mode == "currency") {
            options.style = "currency";
        }
        else if (mode == "percent") {
            options.style = "percent";
        }
        else {
            options.style = "decimal";
        }
        if (value instanceof Money) {
            if (mode == "currency") {
                options.currency = value.currency.code;
            }
            value = value.amount.toNumber();
        }
        else if (value instanceof bignumber_js.BigNumber) {
            value = value.toNumber();
        }
        else if (Array.isArray(value) && value) {
            if (mode == "currency") {
                if (value[0] instanceof Currency) {
                    options.currency = value[0].code;
                }
                else if (value[0]) {
                    options.currency = value[0];
                }
            }
            if (value[1] instanceof bignumber_js.BigNumber) {
                value = value[1].toNumber();
            }
            else {
                value = value[1];
            }
        }
        let formatter = this.formatterInstance(Intl.NumberFormat, undefined, [options]);
        return formatter.format(value);
    }
}
function getCacheId(inputs) {
    let cacheId = [];
    let i, len, input;
    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];
        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        }
        else {
            cacheId.push(input);
        }
    }
    return JSON.stringify(cacheId);
}
function orderedProps(obj) {
    let props = [], keys = [];
    let key, i, len, prop;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    let orderedKeys = keys.sort();
    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key = orderedKeys[i];
        prop = {};
        prop[key] = obj[key];
        props[i] = prop;
    }
    return props;
}

class CurrencyCalculator {
    constructor(baseCurrency) {
        this.baseCurrency = baseCurrency;
        this.rates = [];
    }
    static main() {
        let converter = new CurrencyCalculator(new Currency("PLN"));
        converter.addRate(new Currency("EUR"), new bignumber_js.BigNumber(1), new bignumber_js.BigNumber(4));
        converter.addRate(new Currency("USD"), new bignumber_js.BigNumber(1), new bignumber_js.BigNumber(2));
        let eur1 = new Money(new Currency("EUR"), new bignumber_js.BigNumber(1));
        console.log("1 eur to pln:" + converter.calculate(eur1, new Currency("PLN")));
        let usd1 = new Money(new Currency("USD"), new bignumber_js.BigNumber(1));
        console.log("1 usd to pln:" + converter.calculate(usd1, new Currency("PLN")));
        console.log("1 usd to eur:" + converter.calculate(usd1, new Currency("EUR")));
        console.log("1 eur to usd:" + converter.calculate(eur1, new Currency("USD")));
        let pln1 = new Money(new Currency("PLN"), new bignumber_js.BigNumber(1));
        console.log("1 pln to eur:" + converter.calculate(pln1, new Currency("EUR")));
        console.log("1 pln to usd:" + converter.calculate(pln1, new Currency("USD")));
    }
    getRate(currency) {
        for (let r of this.rates) {
            if (r.currency.code == currency.code) {
                return r;
            }
        }
    }
    addRate(currency, amount, rate) {
        this.rates.push({ currency: currency, amount: amount, rate: rate });
    }
    calculate(amount, from, to) {
        let amountValue = amount instanceof Money ? amount.amount : amount;
        let fromCurrency = amount instanceof Money ? amount.currency : from;
        let toCurrency = amount instanceof Money ? from : to;
        if (fromCurrency.code == toCurrency.code) {
            return amount;
        }
        if (this.baseCurrency.code == toCurrency.code) {
            let calculated = this.calculateToBase(amountValue, fromCurrency);
            if (amount instanceof Money) {
                return new Money(toCurrency, calculated);
            }
            else {
                return calculated;
            }
        }
        let amountFrom = this.calculateToBase(new bignumber_js.BigNumber(1), fromCurrency);
        let amountTo = this.calculateToBase(new bignumber_js.BigNumber(1), toCurrency);
        let amountCalculated = amountFrom.dividedBy(amountTo).times(amountValue);
        if (amount instanceof Money) {
            return new Money(toCurrency, amountCalculated);
        }
        else {
            return amountCalculated;
        }
    }
    calculateToBase(amount, fromCurrency) {
        if (this.baseCurrency.code == fromCurrency.code) {
            return amount;
        }
        let er = this.getRate(fromCurrency);
        return er.rate.dividedBy(er.amount).times(amount);
    }
}

function bestLocale() {
    if (typeof window === "undefined" || typeof window.navigator === "undefined") {
        return INTL_DEFAULT_LOCALE;
    }
    let browserLocale = window.navigator["languages"] ? window.navigator["languages"][0] : undefined;
    browserLocale = browserLocale || window.navigator.language || window.navigator["browserLanguage"] || window.navigator["userLanguage"];
    browserLocale = browserLocale ? browserLocale.toLowerCase() : undefined;
    let urlLocale;
    let urlPath = INTL_LOCALE_URL_PATH ? window.location.pathname.substring(1).split("/") : undefined;
    if (urlPath && urlPath.length >= (INTL_LOCALE_URL_PATH === true ? 1 : 2)) {
        if (INTL_LOCALE_URL_PATH === true) {
            urlLocale = urlPath[0].match(/^\W+$/g) ? undefined : urlPath[0];
        }
        else if (urlPath[0] == INTL_LOCALE_URL_PATH) {
            urlLocale = urlPath[1];
        }
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

class IntlStringValueSerializer extends serializers.ObjectAsMapSerializer {
    constructor(allowPlainValue) {
        super(String);
        this.allowPlainValue = allowPlainValue;
    }
    serialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return json.serialize(value, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
    unserialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return json.unserialize(value, String, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
}

class IntlValueSerializer extends serializers.ObjectAsMapSerializer {
    constructor(valueType) {
        super(valueType);
    }
}

(function (IntlValue) {
    function value(value, locale) {
        if (value) {
            return value[locale];
        }
        return undefined;
    }
    IntlValue.value = value;
    function clone(value) {
        if (!value) {
            return value;
        }
        let niu = {};
        for (let i in value) {
            niu[i] = value[i];
        }
        return niu;
    }
    IntlValue.clone = clone;
})(exports.IntlValue || (exports.IntlValue = {}));

/**
 * Global instance of {@link IntlHelper}.
 */
const intl = new IntlHelper();

/**
 * https://en.wikipedia.org/wiki/IETF-language-tag
 */
class Locale {
    constructor(codeOrPrototype) {
        if (typeof codeOrPrototype === "string") {
            this.code = codeOrPrototype;
        }
        else if (codeOrPrototype.code && typeof codeOrPrototype.code === "string") {
            this.code = codeOrPrototype.code;
        }
        else {
            throw new Error("Locale code must be given in order to create Locale instance");
        }
        this.name = new exports.MessageRef("@umpirsky/locale-list", this.code.split("-").join("_"));
    }
    static fromJSON(json) {
        if (typeof json === "string" || (json && typeof json["code"] == "string")) {
            return new Locale(json);
        }
        else {
            throw new Error("Cannot unserialize '" + json + "' to Locale");
        }
    }
    toString() {
        return this.code;
    }
    toJSON() {
        return { "@type": Locale.jsonTypeName, code: this.code };
    }
}
Locale._codes = ["af", "af-NA", "af-ZA", "ak", "ak-GH", "sq", "sq-AL", "sq-XK", "sq-MK", "am", "am-ET", "ar", "ar-DZ", "ar-BH", "ar-TD", "ar-KM", "ar-DJ", "ar-EG", "ar-ER", "ar-IQ", "ar-IL", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MR", "ar-MA", "ar-OM", "ar-PS", "ar-QA", "ar-SA", "ar-SO", "ar-SS", "ar-SD", "ar-SY", "ar-TN", "ar-AE", "ar-EH", "ar-YE", "hy", "hy-AM", "as", "as-IN", "az", "az-AZ", "az-Cyrl-AZ", "az-Cyrl", "az-Latn-AZ", "az-Latn", "bm", "bm-Latn-ML", "bm-Latn", "eu", "eu-ES", "be", "be-BY", "bn", "bn-BD", "bn-IN", "bs", "bs-BA", "bs-Cyrl-BA", "bs-Cyrl", "bs-Latn-BA", "bs-Latn", "br", "br-FR", "bg", "bg-BG", "my", "my-MM", "ca", "ca-AD", "ca-FR", "ca-IT", "ca-ES", "zh", "zh-CN", "zh-HK", "zh-MO", "zh-Hans-CN", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hans", "zh-SG", "zh-TW", "zh-Hant-HK", "zh-Hant-MO", "zh-Hant-TW", "zh-Hant", "kw", "kw-GB", "hr", "hr-BA", "hr-HR", "cs", "cs-CZ", "da", "da-DK", "da-GL", "nl", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-NL", "nl-SX", "nl-SR", "dz", "dz-BT", "en", "en-AS", "en-AI", "en-AG", "en-AU", "en-BS", "en-BB", "en-BE", "en-BZ", "en-BM", "en-BW", "en-IO", "en-VG", "en-CM", "en-CA", "en-KY", "en-CX", "en-CC", "en-CK", "en-DG", "en-DM", "en-ER", "en-FK", "en-FJ", "en-GM", "en-GH", "en-GI", "en-GD", "en-GU", "en-GG", "en-GY", "en-HK", "en-IN", "en-IE", "en-IM", "en-JM", "en-JE", "en-KE", "en-KI", "en-LS", "en-LR", "en-MO", "en-MG", "en-MW", "en-MY", "en-MT", "en-MH", "en-MU", "en-FM", "en-MS", "en-NA", "en-NR", "en-NZ", "en-NG", "en-NU", "en-NF", "en-MP", "en-PK", "en-PW", "en-PG", "en-PH", "en-PN", "en-PR", "en-RW", "en-WS", "en-SC", "en-SL", "en-SG", "en-SX", "en-SB", "en-ZA", "en-SS", "en-SH", "en-KN", "en-LC", "en-VC", "en-SD", "en-SZ", "en-TZ", "en-TK", "en-TO", "en-TT", "en-TC", "en-TV", "en-UM", "en-VI", "en-UG", "en-GB", "en-US", "en-VU", "en-ZM", "en-ZW", "eo", "et", "et-EE", "ee", "ee-GH", "ee-TG", "fo", "fo-FO", "fi", "fi-FI", "fr", "fr-DZ", "fr-BE", "fr-BJ", "fr-BF", "fr-BI", "fr-CM", "fr-CA", "fr-CF", "fr-TD", "fr-KM", "fr-CG", "fr-CD", "fr-CI", "fr-DJ", "fr-GQ", "fr-FR", "fr-GF", "fr-PF", "fr-GA", "fr-GP", "fr-GN", "fr-HT", "fr-LU", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU", "fr-YT", "fr-MC", "fr-MA", "fr-NC", "fr-NE", "fr-RE", "fr-RW", "fr-SN", "fr-SC", "fr-BL", "fr-MF", "fr-PM", "fr-CH", "fr-SY", "fr-TG", "fr-TN", "fr-VU", "fr-WF", "ff", "ff-CM", "ff-GN", "ff-MR", "ff-SN", "gl", "gl-ES", "lg", "lg-UG", "ka", "ka-GE", "de", "de-AT", "de-BE", "de-DE", "de-LI", "de-LU", "de-CH", "el", "el-CY", "el-GR", "gu", "gu-IN", "ha", "ha-GH", "ha-Latn-GH", "ha-Latn-NE", "ha-Latn-NG", "ha-Latn", "ha-NE", "ha-NG", "he", "he-IL", "hi", "hi-IN", "hu", "hu-HU", "is", "is-IS", "ig", "ig-NG", "id", "id-ID", "ga", "ga-IE", "it", "it-IT", "it-SM", "it-CH", "ja", "ja-JP", "kl", "kl-GL", "kn", "kn-IN", "ks", "ks-Arab-IN", "ks-Arab", "ks-IN", "kk", "kk-Cyrl-KZ", "kk-Cyrl", "kk-KZ", "km", "km-KH", "ki", "ki-KE", "rw", "rw-RW", "ko", "ko-KP", "ko-KR", "ky", "ky-Cyrl-KG", "ky-Cyrl", "ky-KG", "lo", "lo-LA", "lv", "lv-LV", "ln", "ln-AO", "ln-CF", "ln-CG", "ln-CD", "lt", "lt-LT", "lu", "lu-CD", "lb", "lb-LU", "mk", "mk-MK", "mg", "mg-MG", "ms", "ms-BN", "ms-Latn-BN", "ms-Latn-MY", "ms-Latn-SG", "ms-Latn", "ms-MY", "ms-SG", "ml", "ml-IN", "mt", "mt-MT", "gv", "gv-IM", "mr", "mr-IN", "mn", "mn-Cyrl-MN", "mn-Cyrl", "mn-MN", "ne", "ne-IN", "ne-NP", "nd", "nd-ZW", "se", "se-FI", "se-NO", "se-SE", "no", "no-NO", "nb", "nb-NO", "nb-SJ", "nn", "nn-NO", "or", "or-IN", "om", "om-ET", "om-KE", "os", "os-GE", "os-RU", "ps", "ps-AF", "fa", "fa-AF", "fa-IR", "pl", "pl-PL", "pt", "pt-AO", "pt-BR", "pt-CV", "pt-GW", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL", "pa", "pa-Arab-PK", "pa-Arab", "pa-Guru-IN", "pa-Guru", "pa-IN", "pa-PK", "qu", "qu-BO", "qu-EC", "qu-PE", "ro", "ro-MD", "ro-RO", "rm", "rm-CH", "rn", "rn-BI", "ru", "ru-BY", "ru-KZ", "ru-KG", "ru-MD", "ru-RU", "ru-UA", "sg", "sg-CF", "gd", "gd-GB", "sr", "sr-BA", "sr-Cyrl-BA", "sr-Cyrl-XK", "sr-Cyrl-ME", "sr-Cyrl-RS", "sr-Cyrl", "sr-XK", "sr-Latn-BA", "sr-Latn-XK", "sr-Latn-ME", "sr-Latn-RS", "sr-Latn", "sr-ME", "sr-RS", "sh", "sh-BA", "sn", "sn-ZW", "ii", "ii-CN", "si", "si-LK", "sk", "sk-SK", "sl", "sl-SI", "so", "so-DJ", "so-ET", "so-KE", "so-SO", "es", "es-AR", "es-BO", "es-IC", "es-EA", "es-CL", "es-CO", "es-CR", "es-CU", "es-DO", "es-EC", "es-SV", "es-GQ", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PY", "es-PE", "es-PH", "es-PR", "es-ES", "es-US", "es-UY", "es-VE", "sw", "sw-KE", "sw-TZ", "sw-UG", "sv", "sv-AX", "sv-FI", "sv-SE", "tl", "tl-PH", "ta", "ta-IN", "ta-MY", "ta-SG", "ta-LK", "te", "te-IN", "th", "th-TH", "bo", "bo-CN", "bo-IN", "ti", "ti-ER", "ti-ET", "to", "to-TO", "tr", "tr-CY", "tr-TR", "uk", "uk-UA", "ur", "ur-IN", "ur-PK", "ug", "ug-Arab-CN", "ug-Arab", "ug-CN", "uz", "uz-AF", "uz-Arab-AF", "uz-Arab", "uz-Cyrl-UZ", "uz-Cyrl", "uz-Latn-UZ", "uz-Latn", "uz-UZ", "vi", "vi-VN", "cy", "cy-GB", "fy", "fy-NL", "yi", "yo", "yo-BJ", "yo-NG", "zu", "zu-ZA"];
Locale._languages = ["aa", "ab", "ae", "af", "ak", "am", "an", "ar", "as", "av", "ay", "az", "ba", "be", "bg", "bh", "bi", "bm", "bn", "bo", "br", "bs", "ca", "ce", "ch", "co", "cr", "cs", "cu", "cv", "cy", "da", "de", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", "fi", "fj", "fo", "fr", "fy", "ga", "gd", "gl", "gn", "gu", "gv", "ha", "he", "hi", "ho", "hr", "ht", "hu", "hy", "hz", "ia", "id", "ie", "ig", "ii", "ik", "io", "is", "it", "iu", "ja", "jv", "ka", "kg", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ku", "kv", "kw", "ky", "la", "lb", "lg", "li", "ln", "lo", "lt", "lu", "lv", "mg", "mh", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "na", "nb", "nd", "ne", "ng", "nl", "nn", "no", "nr", "nv", "ny", "oc", "oj", "om", "or", "os", "pa", "pi", "pl", "ps", "pt", "qu", "rm", "rn", "ro", "ru", "rw", "sa", "sc", "sd", "se", "sg", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "wa", "wo", "xh", "yi", "yo", "za", "zh", "zu"];
Locale.jsonTypeName = "intl/Locale";

exports.Country = Country;
exports.Currency = Currency;
exports.CurrencyCalculator = CurrencyCalculator;
exports.IntlHelper = IntlHelper;
exports.IntlStringValueSerializer = IntlStringValueSerializer;
exports.IntlValueSerializer = IntlValueSerializer;
exports.Locale = Locale;
exports.Money = Money;
exports.bestLocale = bestLocale;
exports.importMessages = importMessages;
exports.intl = intl;
exports.pushMessages = pushMessages;
