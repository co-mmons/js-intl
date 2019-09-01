import * as tslib_1 from "tslib";
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
        var niu = {};
        for (var i in value) {
            niu[i] = value[i];
        }
        return niu;
    }
    IntlValue.clone = clone;
})(IntlValue || (IntlValue = {}));
var IntlValueSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(IntlValueSerializer, _super);
    function IntlValueSerializer(valueType) {
        return _super.call(this, valueType) || this;
    }
    return IntlValueSerializer;
}(ObjectAsMapSerializer));
export { IntlValueSerializer };
var IntlStringValueSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(IntlStringValueSerializer, _super);
    function IntlStringValueSerializer(allowPlainValue) {
        var _this = _super.call(this, String) || this;
        _this.allowPlainValue = allowPlainValue;
        return _this;
    }
    IntlStringValueSerializer.prototype.serialize = function (value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return serialize(value, options);
        }
        else {
            return _super.prototype.serialize.call(this, value, options);
        }
    };
    IntlStringValueSerializer.prototype.unserialize = function (value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return unserialize(value, String, options);
        }
        else {
            return _super.prototype.serialize.call(this, value, options);
        }
    };
    return IntlStringValueSerializer;
}(ObjectAsMapSerializer));
export { IntlStringValueSerializer };
//# sourceMappingURL=value.js.map