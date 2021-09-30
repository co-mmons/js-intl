"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryStringSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
const Country_1 = require("./Country");
class CountryStringSerializer extends json_1.Serializer {
    unserialize(json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        return Country_1.Country.fromJSON(json);
    }
    serialize(object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else if (object instanceof Country_1.Country) {
            return object.code;
        }
        return object.toJSON();
    }
}
exports.CountryStringSerializer = CountryStringSerializer;
//# sourceMappingURL=CountryStringSerializer.js.map