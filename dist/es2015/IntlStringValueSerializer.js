"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlStringValueSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
class IntlStringValueSerializer extends json_1.ObjectAsMapSerializer {
    constructor(allowPlainValue) {
        super(String);
        this.allowPlainValue = allowPlainValue;
    }
    serialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return json_1.serialize(value, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
    unserialize(value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return json_1.unserialize(value, String, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
}
exports.IntlStringValueSerializer = IntlStringValueSerializer;
//# sourceMappingURL=IntlStringValueSerializer.js.map