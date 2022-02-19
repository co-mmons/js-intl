import { serialize, unserialize } from "@co.mmons/js-utils/json";
import { ObjectAsMapSerializer } from "@co.mmons/js-utils/json/serializers";
export class IntlStringsStoreSerializer extends ObjectAsMapSerializer {
    constructor(allowPlainValue) {
        super(String);
        this.allowPlainValue = allowPlainValue;
    }
    serialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return serialize(value, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
    unserialize(value, options) {
        if (this.allowPlainValue && typeof value === "string") {
            return unserialize(value, String, options);
        }
        else {
            return super.serialize(value, options);
        }
    }
}
//# sourceMappingURL=IntlStringsStoreSerializer.js.map