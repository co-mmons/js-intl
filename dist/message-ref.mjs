var MessageRef = /** @class */ (function () {
    function MessageRef(namespace, key, values, formats) {
        this.namespace = namespace;
        this.key = key;
        this.values = values;
        this.formats = formats;
    }
    MessageRef.prototype.toJSON = function () {
        return [this.namespace, this.key, this.values];
    };
    MessageRef.prototype.toString = function () {
        return this.key;
    };
    MessageRef.prototype.fromJSON = function (json) {
        if (typeof json == "string") {
            var namespaceKey = json.trim().split("#");
            if (namespaceKey.length == 2) {
                this.constructor.call(this, namespaceKey[0], namespaceKey[1]);
                return;
            }
            else {
                this.constructor.call(this, namespaceKey[0], namespaceKey[1]);
                return;
            }
        }
        else if (Array.isArray(json) && json.length > 0) {
            var namespace = json.length > 1 ? json[0] : undefined;
            var key = (json.length == 1 && json[0]) || (json.length > 1 && json[1]);
            var values = json.length == 3 && json[2];
            var formats = json.length == 4 && json[3];
            if ((namespace === null || namespace === undefined || typeof namespace == "string") && typeof key == "string") {
                this.constructor.call(this, namespace, key, values, formats);
                return;
            }
        }
        throw new Error("Cannot unserialize \"" + json + "\" as @co.mmons/js-intl/MessageRef");
    };
    return MessageRef;
}());
export { MessageRef };
//# sourceMappingURL=message-ref.js.map