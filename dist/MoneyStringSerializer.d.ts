import { SerializationOptions, Serializer } from "@co.mmons/js-utils/json";
export declare class MoneyStringSerializer extends Serializer {
    unserialize(json: any, options: SerializationOptions | undefined): any;
    serialize(object: any, options?: SerializationOptions): any;
}
