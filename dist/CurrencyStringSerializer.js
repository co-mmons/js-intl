"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyStringSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
const Currency_1 = require("./Currency");
class CurrencyStringSerializer extends json_1.Serializer {
    unserialize(json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        return Currency_1.Currency.fromJSON(json);
    }
    serialize(object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else if (object instanceof Currency_1.Currency) {
            return object.code;
        }
        return object.toJSON();
    }
}
exports.CurrencyStringSerializer = CurrencyStringSerializer;
//# sourceMappingURL=CurrencyStringSerializer.js.map