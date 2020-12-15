import { SerializationOptions, Serializer } from "@co.mmons/js-utils/json";
export declare class CurrencyStringSerializer extends Serializer {
    unserialize(json: any, options: SerializationOptions | undefined): any;
    serialize(object: any, options?: SerializationOptions): any;
}
