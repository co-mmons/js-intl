"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("@co.mmons/js-utils/json");
var IntlValue;
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
})(IntlValue = exports.IntlValue || (exports.IntlValue = {}));
class IntlValueSerializer extends json_1.ObjectAsMapSerializer {
    constructor(valueType) {
        super(valueType);
    }
}
exports.IntlValueSerializer = IntlValueSerializer;
class IntlStringValueSerializer extends json_1.ObjectAsMapSerializer {
    constructor(allowPlainValue) {
        super(String);
        this.allowPlainValue = allowPlainValue;
    }
    serialize(value, options) {
        if (this.allowPlainValue && typeof value == "string") {
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
//# sourceMappingURL=value.js.map