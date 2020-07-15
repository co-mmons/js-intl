import { __extends } from "tslib";
import { ObjectAsMapSerializer, serialize, unserialize } from "@co.mmons/js-utils/json";
var IntlStringValueSerializer = /** @class */ (function (_super) {
    __extends(IntlStringValueSerializer, _super);
    function IntlStringValueSerializer(allowPlainValue) {
        var _this = _super.call(this, String) || this;
        _this.allowPlainValue = allowPlainValue;
        return _this;
    }
    IntlStringValueSerializer.prototype.serialize = function (value, options) {
        if (this.allowPlainValue && typeof value === "string") {
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
//# sourceMappingURL=IntlStringValueSerializer.js.map