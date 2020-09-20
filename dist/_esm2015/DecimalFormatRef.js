var DecimalFormatRef_1;
import { __decorate, __metadata } from "tslib";
import { subtype, serialize } from "@co.mmons/js-utils/json";
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
    toJSON() {
        const json = {
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
    }
};
DecimalFormatRef.jsonTypeName = "intl/DecimalFormatRef";
DecimalFormatRef = DecimalFormatRef_1 = __decorate([
    subtype(IntlRef, "refType", "decimalFormat"),
    __metadata("design:paramtypes", [Object, Object, Object])
], DecimalFormatRef);
export { DecimalFormatRef };
//# sourceMappingURL=DecimalFormatRef.js.map