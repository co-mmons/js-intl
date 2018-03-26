"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageRef = /** @class */ (function () {
    function MessageRef(_namespace, _key) {
        this._namespace = _namespace;
        this._key = _key;
    }
    Object.defineProperty(MessageRef.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageRef.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: true,
        configurable: true
    });
    MessageRef.prototype.toJSON = function () {
        return this.namespace + "#" + this.key;
    };
    MessageRef.prototype.fromJSON = function (json) {
        if (typeof json == "string" && json) {
            var namespaceKey = json.trim().split("#");
            if (namespaceKey.length == 2) {
                this._namespace = namespaceKey[0];
                this._key = namespaceKey[1];
                return;
            }
            else {
                this._key = namespaceKey[0];
                return;
            }
        }
        throw new Error("Cannot unserialize \"" + json + "\" as @co.mmons/js-intl/MessageRef");
    };
    return MessageRef;
}());
exports.MessageRef = MessageRef;
//# sourceMappingURL=message-ref.js.map