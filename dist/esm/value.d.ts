import { ObjectAsMapSerializer, SerializationOptions, Serializer } from "@co.mmons/js-utils/json";
export interface IntlValue<V = string> {
    [locale: string]: V;
}
export declare namespace IntlValue {
    function value<V>(value: IntlValue<V>, locale?: string): V;
    function clone<V>(value: IntlValue<V>): IntlValue<V>;
}
export declare class IntlValueSerializer extends ObjectAsMapSerializer {
    constructor(valueType: any | Serializer);
}
export declare class IntlStringValueSerializer extends ObjectAsMapSerializer {
    private readonly allowPlainValue?;
    constructor(allowPlainValue?: boolean);
    serialize(value: any, options?: SerializationOptions): any;
    unserialize(value: any, options?: SerializationOptions): any;
}
