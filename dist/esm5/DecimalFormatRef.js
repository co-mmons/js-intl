import { __decorate, __extends, __metadata } from "tslib";
import { subtype, serialize } from "@co.mmons/js-utils/json";
import { BigNumber } from "bignumber.js";
import { IntlRef } from "./IntlRef";
var DecimalFormatRef = /** @class */ (function (_super) {
    __extends(DecimalFormatRef, _super);
    function DecimalFormatRef(value, predefinedOptionsOrOptions, additionalOptions) {
        var _this = _super.call(this, "decimalFormat") || this;
        _this.value = typeof value === "number" ? new BigNumber(value) : value;
        _this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        _this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
        return _this;
    }
    DecimalFormatRef_1 = DecimalFormatRef;
    DecimalFormatRef.fromJSON = function (json) {
        if (typeof json === "object" && json.value && (typeof json.value === "string" || typeof json.value === "number")) {
            return new DecimalFormatRef_1(new BigNumber(json.value), typeof json.predefined === "string" ? json.predefined : undefined, typeof json.predefined === "object" ? json.options : undefined);
        }
        throw new Error("Cannot unserialize \"" + json + "\" as @co.mmons/js-intl/DecimalFormatRef");
    };
    DecimalFormatRef.prototype.toJSON = function () {
        var json = {
            "@type": DecimalFormatRef_1.jsonTypeName,
            value: serialize(this.value)
        };
        if (this.options) {
            json.options = serialize(this.options);
        }
        if (this.predefined) {
            json.predefined = this.predefined;
        }
        return json;
    };
    var DecimalFormatRef_1;
    DecimalFormatRef.jsonTypeName = "intl/DecimalFormatRef";
    DecimalFormatRef = DecimalFormatRef_1 = __decorate([
        subtype(IntlRef, "refType", "decimalFormat"),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], DecimalFormatRef);
    return DecimalFormatRef;
}(IntlRef));
export { DecimalFormatRef };
//# sourceMappingURL=DecimalFormatRef.js.map