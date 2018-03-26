export class MessageRef {

    constructor(private _namespace: string, private _key: string) {
    }

    get namespace(): string {
        return this._namespace;
    }

    get key(): string {
        return this._key;
    }

    toJSON() {
        return `${this.namespace}#${this.key}`;
    }

    protected fromJSON(json: any) {

        if (typeof json == "string" && json) {
            let namespaceKey = json.trim().split("#");
            if (namespaceKey.length == 2) {
                this._namespace = namespaceKey[0];
                this._key = namespaceKey[1];
                return;
            } else {
                this._key = namespaceKey[0];
                return;
            }
        }

        throw new Error(`Cannot unserialize "${json}" as @co.mmons/js-intl/MessageRef`);
    }
}