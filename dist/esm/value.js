import { ObjectAsMapSerializer, serialize, unserialize } from "@co.mmons/js-utils/json";
export var IntlValue;
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
})(IntlValue || (IntlValue = {}));
export class IntlValueSerializer extends ObjectAsMapSerializer {
    constructor(valueType) {
        super(valueType);
    }
}
export class IntlStringValueSerializer extends ObjectAsMapSerializer {
    constructor(allowPlainValue) {
        super(String);
        this.allowPlainValue = allowPlainValue;
    }
    serialize(value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return serialize(value, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
    unserialize(value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return unserialize(value, String, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
}
//# sourceMappingURL=value.js.map