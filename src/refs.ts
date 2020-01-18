import {forwardRef} from "@co.mmons/js-utils/core";
import {Property, serialize, Subtype} from "@co.mmons/js-utils/json";
import {BigNumber} from "bignumber.js";

type RefType = "message" | "decimalFormat";

@Subtype("refType", "message", forwardRef(() => MessageRef))
@Subtype("refType", "decimalFormat", forwardRef(() => DecimalFormatRef))
export abstract class IntlRef {

    protected constructor(type: RefType) {
        this.refType = type;
    }

    protected readonly refType: RefType;

}

export class MessageRef extends IntlRef {

    constructor(public readonly namespace: string, public readonly key: string, public readonly values?: {[key: string]: any}, public readonly formats?: any) {
        super("message");
    }

    toJSON() {

        const json: any = {
            refType: this.refType,
            key: this.key
        };

        if (this.namespace) {
            json.type = this.namespace;
        }

        if (this.values) {
            json.values = serialize(this.values);
        }

        return json;
    }

    toString() {
        return this.key;
    }

    protected fromJSON(json: any) {

        if (typeof json === "string") {
            let namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                this["namespace" as any] = namespaceKey[0];
                this["key" as any] = namespaceKey[1];
                return;
            } else {
                this["namespace" as any] = undefined;
                this["key" as any] = json;
                return;
            }

        } else if (Array.isArray(json) && json.length > 0) {
            let namespace = json.length > 1 ? json[0] : undefined;
            let key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            let values = json.length == 3 && json[2];
            let formats = json.length == 4 && json[3];

            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                this["namespace" as any] = namespace;
                this["key" as any] = key;
                this["values" as any] = values;
                this["formats" as any] = formats;
                return;
            }

        } else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            this["namespace" as any] = (typeof json.namespace === "string" && json.namespace) || undefined;
            this["key" as any] = json.key;
            this["values" as any] = typeof json.values === "object" ? json.values : undefined;
            this["formats" as any] = json.formats;
            return;
        }

        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/MessageRef`);
    }
}

export class DecimalFormatRef extends IntlRef {

    constructor(value: number | BigNumber, options?: Intl.NumberFormatOptions);

    constructor(value: number | BigNumber, predefinedOptionsOrOptions?: string | Intl.NumberFormatOptions, additionalOptions?: Intl.NumberFormatOptions) {
        super("decimalFormat");

        this.value = typeof value === "number" ? new BigNumber(value) : value;
        this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
    }

    readonly value: BigNumber;

    readonly options?: Intl.NumberFormatOptions;

    readonly predefined?: string;

    toJSON() {

        const json: any = {
            refType: this.refType,
            value: serialize(this.value)
        };

        if (this.options) {
            json.options = serialize(this.options);
        }

        if (this.predefined) {
            json.predefined = this.predefined
        }

        return json;
    }

    fromJSON(json: any) {

        if (typeof json === "object" && json.value && this.value && typeof json.value === "string" || typeof json.value === "number") {
            this["value" as any] = new BigNumber(json.value);
            this["predefined" as any] = typeof json.predefined === "string" ? json.predefined : undefined;
            this["options" as any] = typeof json.predefined === "object" ? json.options : undefined;
            return;
        }

        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/DecimalFormatRef`);
    }

}
