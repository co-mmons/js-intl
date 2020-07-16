"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlStringValueSerializer = void 0;
var tslib_1 = require("tslib");
var json_1 = require("@co.mmons/js-utils/json");
var serializers_1 = require("@co.mmons/js-utils/json/serializers");
var IntlStringValueSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(IntlStringValueSerializer, _super);
    function IntlStringValueSerializer(allowPlainValue) {
        var _this = _super.call(this, String) || this;
        _this.allowPlainValue = allowPlainValue;
        return _this;
    }
    IntlStringValueSerializer.prototype.serialize = function (value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return json_1.serialize(value, options);
        }
        else {
            return _super.prototype.serialize.call(this, value, options);
        }
    };
    IntlStringValueSerializer.prototype.unserialize = function (value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return json_1.unserialize(value, String, options);
        }
        else {
            return _super.prototype.serialize.call(this, value, options);
        }
    };
    return IntlStringValueSerializer;
}(serializers_1.ObjectAsMapSerializer));
exports.IntlStringValueSerializer = IntlStringValueSerializer;
//# sourceMappingURL=IntlStringValueSerializer.js.map