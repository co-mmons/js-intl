"use strict";
var MessageRef_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRef = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@co.mmons/js-utils/json");
const IntlRef_1 = require("./IntlRef");
let MessageRef = MessageRef_1 = class MessageRef extends IntlRef_1.IntlRef {
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
    toJSON() {
        const json = {
            "@type": MessageRef_1.jsonTypeName,
            key: this.key
        };
        if (this.namespace) {
            json.type = this.namespace;
        }
        if (this.values) {
            json.values = json_1.serialize(this.values);
        }
        return json;
    }
    toString() {
        return this.key;
    }
};
MessageRef.jsonTypeName = "intl/MessageRef";
MessageRef = MessageRef_1 = tslib_1.__decorate([
    json_1.subtype(IntlRef_1.IntlRef, "refType", "message"),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object])
], MessageRef);
exports.MessageRef = MessageRef;
//# sourceMappingURL=MessageRef.js.map