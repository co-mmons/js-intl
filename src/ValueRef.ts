import {subtype} from "@co.mmons/js-utils/json";
import {IntlRef} from "./IntlRef";

@subtype(IntlRef, "refType", "message")
export class ValueRef extends IntlRef {

    static readonly jsonTypeName: string = "intl/ValueRef";

    static fromJSON(json: any) {

        if (typeof json === "string") {
            const namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                return new ValueRef(namespaceKey[0], namespaceKey[1]);
            } else {
                return new ValueRef(undefined, json);
            }

        } else if (Array.isArray(json) && json.length > 0) {
            const namespace = json.length > 1 ? json[0] : undefined;
            const key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);

            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                return new ValueRef(namespace, key);
            }

        } else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            return new ValueRef((typeof json.namespace === "string" && json.namespace) || undefined, json.key);
        }

        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/ValueRef`);
    }

    /**
     * Constructor for a key with default namespace.
     */
    constructor(key: string);

    constructor(namespace: string, key: string);

    constructor(namespaceOrKey: string, key?: string) {
        super("value");

        if (typeof key === "string") {
            this.namespace = namespaceOrKey;
            this.key = key;
        } else {
            this.key = namespaceOrKey;
        }
    }

    readonly namespace: string;
    readonly key: string;

    toJSON() {

        const json: any = {
            "@type": ValueRef.jsonTypeName,
            key: this.key
        };

        if (this.namespace) {
            json.namespace = this.namespace;
        }

        return json;
    }

    toString() {
        return this.key;
    }
}
