import {ObjectAsMapSerializer, SerializationOptions, serialize, unserialize} from "@co.mmons/js-utils/json";

export class IntlStringsStoreSerializer extends ObjectAsMapSerializer {

    constructor(private readonly allowPlainValue?: boolean) {
        super(String);
    }

    serialize(value: any, options?: SerializationOptions): any {
        if (this.allowPlainValue && typeof value === "string") {
            return serialize(value, options);
        } else {
            return super.serialize(value, options);
        }
    }

    unserialize(value: any, options?: SerializationOptions): any {

        if (this.allowPlainValue && typeof value === "string") {
            return unserialize(value, String, options);
        } else {
            return super.serialize(value, options);
        }
    }

}
