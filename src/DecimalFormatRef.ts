import {jsonSubtype, serialize} from "@co.mmons/js-utils/json";
import {BigNumber} from "bignumber.js";
import {IntlRef} from "./IntlRef";

@jsonSubtype(IntlRef, "refType", "decimalFormat")
@jsonSubtype(IntlRef, "@type", "intl/DecimalFormatRef")
export class DecimalFormatRef extends IntlRef {

    static readonly jsonTypeName = "intl/DecimalFormatRef";

    static fromJSON(json: any) {

        if (typeof json === "object" && json.value && (typeof json.value === "string" || typeof json.value === "number")) {
            return new DecimalFormatRef(
                new BigNumber(json.value),
                typeof json.predefined === "string" ? json.predefined : undefined,
                typeof json.predefined === "object" ? json.options : undefined
            );
        }

        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/DecimalFormatRef`);
    }

    constructor(value: number | BigNumber, options?: Intl.NumberFormatOptions);

    constructor(value: number | BigNumber, predefined: string, options?: Intl.NumberFormatOptions);

    constructor(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        super("decimalFormat");

        this.value = typeof value === "number" ? new BigNumber(value) : value;
        this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
    }

    readonly value: BigNumber;

    readonly options?: Intl.NumberFormatOptions;

    readonly predefined?: string;

    toJSON(options?: DecimalFormatRefJsonOptions) {

        const json: any = {
            value: serialize(this.value)
        };

        if (options?.["@co.mmons/js-intl/DecimalFormatRef"]?.output === "refType") {
            json.refType = this.refType;
        } else {
            json["@type"] = DecimalFormatRef.jsonTypeName;
        }

        if (this.options) {
            json.options = serialize(this.options);
        }

        if (this.predefined) {
            json.predefined = this.predefined
        }

        return json;
    }

}

export interface DecimalFormatRefJsonOptions {
    "@co.mmons/js-intl/DecimalFormatRef"?: {output?: "@type" | "refType"}
}
