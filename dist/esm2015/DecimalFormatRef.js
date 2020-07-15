var DecimalFormatRef_1;
import { __decorate, __metadata } from "tslib";
import { jsonSubtype, serialize } from "@co.mmons/js-utils/json";
import { BigNumber } from "bignumber.js";
import { IntlRef } from "./IntlRef";
let DecimalFormatRef = DecimalFormatRef_1 = class DecimalFormatRef extends IntlRef {
    constructor(value, predefinedOptionsOrOptions, additionalOptions) {
        super("decimalFormat");
        this.value = typeof value === "number" ? new BigNumber(value) : value;
        this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
    }
    static fromJSON(json) {
        if (typeof json === "object" && json.value && (typeof json.value === "string" || typeof json.value === "number")) {
            return new DecimalFormatRef_1(new BigNumber(json.value), typeof json.predefined === "string" ? json.predefined : undefined, typeof json.predefined === "object" ? json.options : undefined);
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/DecimalFormatRef`);
    }
    toJSON(options) {
        var _a;
        const json = {
            value: serialize(this.value)
        };
        if (((_a = options === null || options === void 0 ? void 0 : options["@co.mmons/js-intl/DecimalFormatRef"]) === null || _a === void 0 ? void 0 : _a.output) === "refType") {
            json.refType = this.refType;
        }
        else {
            json["@type"] = DecimalFormatRef_1.jsonTypeName;
        }
        if (this.options) {
            json.options = serialize(this.options);
        }
        if (this.predefined) {
            json.predefined = this.predefined;
        }
        return json;
    }
};
DecimalFormatRef.jsonTypeName = "intl/DecimalFormatRef";
DecimalFormatRef = DecimalFormatRef_1 = __decorate([
    jsonSubtype(IntlRef, "refType", "decimalFormat"),
    jsonSubtype(IntlRef, "@type", "intl/DecimalFormatRef"),
    __metadata("design:paramtypes", [Object, Object, Object])
], DecimalFormatRef);
export { DecimalFormatRef };
//# sourceMappingURL=DecimalFormatRef.js.map