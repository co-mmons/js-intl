"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyStringSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
const Money_1 = require("./Money");
class MoneyStringSerializer extends json_1.Serializer {
    unserialize(json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        return Money_1.Money.fromJSON(json);
    }
    serialize(object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else if (object instanceof Money_1.Money) {
            return object.toString();
        }
        return object.toJSON();
    }
}
exports.MoneyStringSerializer = MoneyStringSerializer;
//# sourceMappingURL=MoneyStringSerializer.js.map