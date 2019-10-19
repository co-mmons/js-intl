export class MessageRef {

    constructor(public readonly namespace: string, public readonly key: string, public readonly values?: {[key: string]: any}, public readonly formats?: any) {
    }

    toJSON() {
        return [this.namespace, this.key, this.values];
    }

    toString() {
        return this.key;
    }

    protected fromJSON(json: any) {

        if (typeof json == "string") {
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
        }

        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/MessageRef`);
    }
}
