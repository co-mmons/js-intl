import { SerializationOptions } from "@co.mmons/js-utils/json";
import { ObjectAsMapSerializer } from "@co.mmons/js-utils/json/serializers";
export declare class IntlStringValueSerializer extends ObjectAsMapSerializer {
    private readonly allowPlainValue?;
    constructor(allowPlainValue?: boolean);
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
