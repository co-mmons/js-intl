"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@co.mmons/js-utils/core");
var json_1 = require("@co.mmons/js-utils/json");
var bignumber_js_1 = require("bignumber.js");
var IntlRef = /** @class */ (function () {
    function IntlRef(type) {
        this.refType = type;
    }
    IntlRef = tslib_1.__decorate([
        json_1.Subtype("refType", "message", core_1.forwardRef(function () { return MessageRef; })),
        json_1.Subtype("refType", "decimalFormat", core_1.forwardRef(function () { return DecimalFormatRef; })),
        tslib_1.__metadata("design:paramtypes", [String])
    ], IntlRef);
    return IntlRef;
}());
exports.IntlRef = IntlRef;
var MessageRef = /** @class */ (function (_super) {
    tslib_1.__extends(MessageRef, _super);
    function MessageRef(namespace, key, values, formats) {
        var _this = _super.call(this, "message") || this;
        _this.namespace = namespace;
        _this.key = key;
        _this.values = values;
        _this.formats = formats;
        return _this;
    }
    MessageRef.prototype.toJSON = function () {
        var json = {
            refType: this.refType,
            key: this.key
        };
        if (this.namespace) {
            json.type = this.namespace;
        }
        if (this.values) {
            json.values = json_1.serialize(this.values);
        }
        return json;
    };
    MessageRef.prototype.toString = function () {
        return this.key;
    };
    MessageRef.prototype.fromJSON = function (json) {
        if (typeof json === "string") {
            var namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                this["namespace"] = namespaceKey[0];
                this["key"] = namespaceKey[1];
                return;
            }
            else {
                this["namespace"] = undefined;
                this["key"] = json;
                return;
            }
        }
        else if (Array.isArray(json) && json.length > 0) {
            var namespace = json.length > 1 ? json[0] : undefined;
            var key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            var values = json.length == 3 && json[2];
            var formats = json.length == 4 && json[3];
            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                this["namespace"] = namespace;
                this["key"] = key;
                this["values"] = values;
                this["formats"] = formats;
                return;
            }
        }
        else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            this["namespace"] = (typeof json.namespace === "string" && json.namespace) || undefined;
            this["key"] = json.key;
            this["values"] = typeof json.values === "object" ? json.values : undefined;
            this["formats"] = json.formats;
            return;
        }
        throw new Error("Cannot unserialize \"" + json + "\" as @co.mmons/js-intl/MessageRef");
    };
    return MessageRef;
}(IntlRef));
exports.MessageRef = MessageRef;
var DecimalFormatRef = /** @class */ (function (_super) {
    tslib_1.__extends(DecimalFormatRef, _super);
    function DecimalFormatRef(value, predefinedOptionsOrOptions, additionalOptions) {
        var _this = _super.call(this, "decimalFormat") || this;
        _this.value = typeof value === "number" ? new bignumber_js_1.BigNumber(value) : value;
        _this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        _this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
        return _this;
    }
    DecimalFormatRef.prototype.toJSON = function () {
        var json = {
            refType: this.refType,
            value: json_1.serialize(this.value)
        };
        if (this.options) {
            json.options = json_1.serialize(this.options);
        }
        if (this.predefined) {
            json.predefined = this.predefined;
        }
        return json;
    };
    DecimalFormatRef.prototype.fromJSON = function (json) {
        if (typeof json === "object" && json.value && this.value && typeof json.value === "string" || typeof json.value === "number") {
            this["value"] = new bignumber_js_1.BigNumber(json.value);
            this["predefined"] = typeof json.predefined === "string" ? json.predefined : undefined;
            this["options"] = typeof json.predefined === "object" ? json.options : undefined;
            return;
        }
        throw new Error("Cannot unserialize \"" + json + "\" as @co.mmons/js-intl/DecimalFormatRef");
    };
    return DecimalFormatRef;
}(IntlRef));
exports.DecimalFormatRef = DecimalFormatRef;
//# sourceMappingURL=refs.js.map