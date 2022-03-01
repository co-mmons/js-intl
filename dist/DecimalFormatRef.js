"use strict";
var DecimalFormatRef_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalFormatRef = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@co.mmons/js-utils/json");
const bignumber_js_1 = require("bignumber.js");
const IntlRef_1 = require("./IntlRef");
let DecimalFormatRef = DecimalFormatRef_1 = class DecimalFormatRef extends IntlRef_1.IntlRef {
    constructor(value, predefinedOptionsOrOptions, additionalOptions) {
        super("decimalFormat");
        this.value = typeof value === "number" ? new bignumber_js_1.BigNumber(value) : value;
        this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
    }
    static fromJSON(json) {
        if (typeof json === "object" && json.value && (typeof json.value === "string" || typeof json.value === "number")) {
            return new DecimalFormatRef_1(new bignumber_js_1.BigNumber(json.value), typeof json.predefined === "string" ? json.predefined : undefined, typeof json.predefined === "object" ? json.options : undefined);
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/DecimalFormatRef`);
    }
    toJSON() {
        const json = {
            "@type": DecimalFormatRef_1.jsonTypeName,
            value: (0, json_1.serialize)(this.value)
        };
        if (this.options) {
            json.options = (0, json_1.serialize)(this.options);
        }
        if (this.predefined) {
            json.predefined = this.predefined;
        }
        return json;
    }
};
DecimalFormatRef.jsonTypeName = "intl/DecimalFormatRef";
DecimalFormatRef = DecimalFormatRef_1 = tslib_1.__decorate([
    (0, json_1.subtype)(IntlRef_1.IntlRef, "refType", "decimalFormat"),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], DecimalFormatRef);
exports.DecimalFormatRef = DecimalFormatRef;
//# sourceMappingURL=DecimalFormatRef.js.map