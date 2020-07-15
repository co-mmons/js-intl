"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlValueSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
class IntlValueSerializer extends json_1.ObjectAsMapSerializer {
    constructor(valueType) {
        super(valueType);
    }
}
exports.IntlValueSerializer = IntlValueSerializer;
//# sourceMappingURL=IntlValueSerializer.js.map