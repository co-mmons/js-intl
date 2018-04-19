"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var json_1 = require("@co.mmons/js-utils/json");
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
        var niu = {};
        for (var i in value) {
            niu[i] = value[i];
        }
        return niu;
    }
    IntlValue.clone = clone;
})(IntlValue = exports.IntlValue || (exports.IntlValue = {}));
var IntlValueSerializer = /** @class */ (function (_super) {
    __extends(IntlValueSerializer, _super);
    function IntlValueSerializer(valueType) {
        return _super.call(this, valueType) || this;
    }
    return IntlValueSerializer;
}(json_1.ObjectAsMapSerializer));
exports.IntlValueSerializer = IntlValueSerializer;
var IntlStringValueSerializer = /** @class */ (function (_super) {
    __extends(IntlStringValueSerializer, _super);
    function IntlStringValueSerializer(allowPlainValue) {
        var _this = _super.call(this, String) || this;
        _this.allowPlainValue = allowPlainValue;
        return _this;
    }
    IntlStringValueSerializer.prototype.serialize = function (value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return json_1.serialize(value, options);
        }
        else {
            return _super.prototype.serialize.call(this, value, options);
        }
    };
    IntlStringValueSerializer.prototype.unserialize = function (value, options) {
        if (this.allowPlainValue && typeof value == "string") {
            return json_1.unserialize(value, String, options);
        }
        else {
            return _super.prototype.serialize.call(this, value, options);
        }
    };
    return IntlStringValueSerializer;
}(json_1.ObjectAsMapSerializer));
exports.IntlStringValueSerializer = IntlStringValueSerializer;
//# sourceMappingURL=value.js.map