"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlStringsStoreSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
class IntlStringsStoreSerializer extends json_1.ObjectAsMapSerializer {
    constructor(allowPlainValue) {
        super(String);
        this.allowPlainValue = allowPlainValue;
    }
    serialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return (0, json_1.serialize)(value, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
    unserialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return (0, json_1.unserialize)(value, String, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
}
exports.IntlStringsStoreSerializer = IntlStringsStoreSerializer;
//# sourceMappingURL=IntlStringsStoreSerializer.js.map