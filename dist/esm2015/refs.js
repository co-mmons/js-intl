import * as tslib_1 from "tslib";
import { forwardRef } from "@co.mmons/js-utils/core";
import { serialize, Subtype } from "@co.mmons/js-utils/json";
import { BigNumber } from "bignumber.js";
let IntlRef = class IntlRef {
    constructor(type) {
        this.refType = type;
    }
};
IntlRef = tslib_1.__decorate([
    Subtype("refType", "message", forwardRef(() => MessageRef)),
    Subtype("refType", "decimalFormat", forwardRef(() => DecimalFormatRef)),
    tslib_1.__metadata("design:paramtypes", [String])
], IntlRef);
export { IntlRef };
export class MessageRef extends IntlRef {
    constructor(namespace, key, values, formats) {
        super("message");
        this.namespace = namespace;
        this.key = key;
        this.values = values;
        this.formats = formats;
    }
    toJSON() {
        const json = {
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
    fromJSON(json) {
        if (typeof json === "string") {
            let namespaceKey = json.trim().split("#");
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
            let namespace = json.length > 1 ? json[0] : undefined;
            let key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            let values = json.length == 3 && json[2];
            let formats = json.length == 4 && json[3];
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
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/MessageRef`);
    }
}
export class DecimalFormatRef extends IntlRef {
    constructor(value, predefinedOptionsOrOptions, additionalOptions) {
        super("decimalFormat");
        this.value = typeof value === "number" ? new BigNumber(value) : value;
        this.options = typeof predefinedOptionsOrOptions === "object" ? predefinedOptionsOrOptions : additionalOptions;
        this.predefined = typeof predefinedOptionsOrOptions === "string" ? predefinedOptionsOrOptions : undefined;
    }
    toJSON() {
        const json = {
            refType: this.refType,
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
    fromJSON(json) {
        if (typeof json === "object" && json.value && this.value && typeof json.value === "string" || typeof json.value === "number") {
            this["value"] = new BigNumber(json.value);
            this["predefined"] = typeof json.predefined === "string" ? json.predefined : undefined;
            this["options"] = typeof json.predefined === "object" ? json.options : undefined;
            return;
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/DecimalFormatRef`);
    }
}
//# sourceMappingURL=refs.js.map