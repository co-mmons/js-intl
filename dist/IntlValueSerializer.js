"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlValueSerializer = void 0;
var tslib_1 = require("tslib");
var serializers_1 = require("@co.mmons/js-utils/json/serializers");
var IntlValueSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(IntlValueSerializer, _super);
    function IntlValueSerializer(valueType) {
        return _super.call(this, valueType) || this;
    }
    return IntlValueSerializer;
}(serializers_1.ObjectAsMapSerializer));
exports.IntlValueSerializer = IntlValueSerializer;
//# sourceMappingURL=IntlValueSerializer.js.map