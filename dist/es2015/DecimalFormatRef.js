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
    toJSON(options) {
        var _a;
        const json = {
            value: json_1.serialize(this.value)
        };
        if (((_a = options === null || options === void 0 ? void 0 : options["@co.mmons/js-intl/DecimalFormatRef"]) === null || _a === void 0 ? void 0 : _a.output) === "refType") {
            json.refType = this.refType;
        }
        else {
            json["@type"] = DecimalFormatRef_1.jsonTypeName;
        }
        if (this.options) {
            json.options = json_1.serialize(this.options);
        }
        if (this.predefined) {
            json.predefined = this.predefined;
        }
        return json;
    }
};
DecimalFormatRef.jsonTypeName = "intl/DecimalFormatRef";
DecimalFormatRef = DecimalFormatRef_1 = tslib_1.__decorate([
    json_1.jsonSubtype(IntlRef_1.IntlRef, "refType", "decimalFormat"),
    json_1.jsonSubtype(IntlRef_1.IntlRef, "@type", "intl/DecimalFormatRef"),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], DecimalFormatRef);
exports.DecimalFormatRef = DecimalFormatRef;
//# sourceMappingURL=DecimalFormatRef.js.map