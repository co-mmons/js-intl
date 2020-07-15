var MessageRef_1;
import { __decorate, __metadata } from "tslib";
import { serialize, subtype } from "@co.mmons/js-utils/json";
import { IntlRef } from "./IntlRef";
let MessageRef = MessageRef_1 = class MessageRef extends IntlRef {
    constructor(namespace, key, values, formats) {
        super("message");
        this.namespace = namespace;
        this.key = key;
        this.values = values;
        this.formats = formats;
    }
    static fromJSON(json) {
        if (typeof json === "string") {
            const namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                return new MessageRef_1(namespaceKey[0], namespaceKey[1]);
            }
            else {
                return new MessageRef_1(undefined, json);
            }
        }
        else if (Array.isArray(json) && json.length > 0) {
            const namespace = json.length > 1 ? json[0] : undefined;
            const key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            const values = json.length == 3 && json[2];
            const formats = json.length == 4 && json[3];
            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                return new MessageRef_1(namespace, key, values, formats);
            }
        }
        else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            return new MessageRef_1((typeof json.namespace === "string" && json.namespace) || undefined, json.key, typeof json.values === "object" ? json.values : undefined, json.formats);
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/MessageRef`);
    }
    toJSON(options) {
        var _a;
        const json = {
            key: this.key
        };
        if (((_a = options === null || options === void 0 ? void 0 : options["@co.mmons/js-intl/MessageRef"]) === null || _a === void 0 ? void 0 : _a.output) === "refType") {
            json.refType = this.refType;
        }
        else {
            json["@type"] = MessageRef_1.jsonTypeName;
        }
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
};
MessageRef.jsonTypeName = "intl/MessageRef";
MessageRef = MessageRef_1 = __decorate([
    subtype(IntlRef, "refType", "message"),
    __metadata("design:paramtypes", [String, String, Object, Object])
], MessageRef);
export { MessageRef };
//# sourceMappingURL=MessageRef.js.map