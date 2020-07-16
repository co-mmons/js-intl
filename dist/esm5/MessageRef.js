import { __decorate, __extends, __metadata } from "tslib";
import { serialize, subtype } from "@co.mmons/js-utils/json";
import { IntlRef } from "./IntlRef";
var MessageRef = /** @class */ (function (_super) {
    __extends(MessageRef, _super);
    function MessageRef(namespace, key, values, formats) {
        var _this = _super.call(this, "message") || this;
        _this.namespace = namespace;
        _this.key = key;
        _this.values = values;
        _this.formats = formats;
        return _this;
    }
    MessageRef_1 = MessageRef;
    MessageRef.fromJSON = function (json) {
        if (typeof json === "string") {
            var namespaceKey = json.trim().split("#");
            if (namespaceKey.length >= 2) {
                return new MessageRef_1(namespaceKey[0], namespaceKey[1]);
            }
            else {
                return new MessageRef_1(undefined, json);
            }
        }
        else if (Array.isArray(json) && json.length > 0) {
            var namespace = json.length > 1 ? json[0] : undefined;
            var key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            var values = json.length == 3 && json[2];
            var formats = json.length == 4 && json[3];
            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                return new MessageRef_1(namespace, key, values, formats);
            }
        }
        else if (typeof json === "object" && typeof json.key === "string" && json.key) {
            return new MessageRef_1((typeof json.namespace === "string" && json.namespace) || undefined, json.key, typeof json.values === "object" ? json.values : undefined, json.formats);
        }
        throw new Error("Cannot unserialize \"" + json + "\" as @co.mmons/js-intl/MessageRef");
    };
    MessageRef.prototype.toJSON = function () {
        var json = {
            "@type": MessageRef_1.jsonTypeName,
            key: this.key
        };
        if (this.namespace) {
            json.type = this.namespace;
        }
        if (this.values) {
            json.values = serialize(this.values);
        }
        return json;
    };
    MessageRef.prototype.toString = function () {
        return this.key;
    };
    var MessageRef_1;
    MessageRef.jsonTypeName = "intl/MessageRef";
    MessageRef = MessageRef_1 = __decorate([
        subtype(IntlRef, "refType", "message"),
        __metadata("design:paramtypes", [String, String, Object, Object])
    ], MessageRef);
    return MessageRef;
}(IntlRef));
export { MessageRef };
//# sourceMappingURL=MessageRef.js.map