"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Country = (function () {
    function Country(codeOrPrototype) {
        if (typeof codeOrPrototype === "string") {
            this._code = codeOrPrototype;
        }
        else if (codeOrPrototype["code"] && typeof codeOrPrototype["code"] === "string") {
            this._code = codeOrPrototype["code"];
        }
        else {
            throw "Country code must be given in order to create Country instance";
        }
    }
    Country.codes = function () {
        return Country._codes.slice();
    };
    Country.countries = function () {
        var cntrs = [];
        for (var _i = 0, _a = Country._codes; _i < _a.length; _i++) {
            var c = _a[_i];
            cntrs.push(new Country(c));
        }
        return cntrs;
    };
    Object.defineProperty(Country.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Country.prototype.name = function (intl) {
        return intl.message("country-list." + this.code);
    };
    Country.prototype.toString = function () {
        return this._code;
    };
    Country.prototype.toJSON = function () {
        return this._code;
    };
    Country.prototype.fromJSON = function (json) {
        if (typeof json === "string") {
            this._code = json;
        }
        else if (json && typeof json["code"] === "string") {
            this._code = json["code"];
        }
        else {
            throw new Error("Cannot unserialize  '" + json + "' to Country instance");
        }
    };
    Country._codes = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"];
    return Country;
}());
exports.Country = Country;
//# sourceMappingURL=country.js.map