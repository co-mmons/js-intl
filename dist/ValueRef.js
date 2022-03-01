"use strict";
var ValueRef_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueRef = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@co.mmons/js-utils/json");
const IntlRef_1 = require("./IntlRef");
let ValueRef = ValueRef_1 = class ValueRef extends IntlRef_1.IntlRef {
    constructor(namespaceOrKey, key) {
        super("value");
        if (typeof key === "string") {
            this.namespace = namespaceOrKey;
            this.key = key;
        }
        else {
            this.key = namespaceOrKey;
        }
    }
    static fromJSON(json) {
        if (typeof json === "string") {
            const namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                return new ValueRef_1(namespaceKey[0], namespaceKey[1]);
            }
            else {
                return new ValueRef_1(undefined, json);
            }
        }
        else if (Array.isArray(json) && json.length > 0) {
            const namespace = json.length > 1 ? json[0] : undefined;
            const key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                return new ValueRef_1(namespace, key);
            }
        }
        else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            return new ValueRef_1((typeof json.namespace === "string" && json.namespace) || undefined, json.key);
        }
        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/ValueRef`);
    }
    toJSON() {
        const json = {
            "@type": ValueRef_1.jsonTypeName,
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
};
ValueRef.jsonTypeName = "intl/ValueRef";
ValueRef = ValueRef_1 = tslib_1.__decorate([
    (0, json_1.subtype)(IntlRef_1.IntlRef, "refType", "message"),
    tslib_1.__metadata("design:paramtypes", [String, String])
], ValueRef);
exports.ValueRef = ValueRef;
//# sourceMappingURL=ValueRef.js.map