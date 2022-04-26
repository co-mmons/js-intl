import { ObjectAsMapSerializer, SerializationOptions } from "@co.mmons/js-utils/json";
export declare class IntlStringsStoreSerializer extends ObjectAsMapSerializer {
    private readonly allowPlainValue?;
    constructor(allowPlainValue?: boolean);
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
