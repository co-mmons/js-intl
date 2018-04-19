import {Type, Enumerable} from "@co.mmons/js-utils/core";
import {Serializer, ObjectAsMapSerializer, SerializationOptions, serialize, unserialize} from "@co.mmons/js-utils/json";

export interface IntlValue<V> {
    [locale: string]: V;
}

export namespace IntlValue {

    export function value<V>(value: IntlValue<V>, locale?: string): V {

        if (value) {
            return value[locale];
        }

        return undefined;
    }

    export function clone<V>(value: IntlValue<V>): IntlValue<V> {

        if (!value) {
            return value;
        }

        let niu: IntlValue<V> = {};

        for (let i in value) {
            niu[i] = value[i];
        }

        return niu;
    }
}

export class IntlValueSerializer extends ObjectAsMapSerializer {

    constructor(valueType: any | Serializer) {
        super(valueType);
    }

}

export class IntlStringValueSerializer extends ObjectAsMapSerializer {

    constructor(private readonly allowPlainValue?: boolean) {
        super(String);
    }

    serialize(value: any, options?: SerializationOptions): any {
        if (this.allowPlainValue && typeof value == "string") {
            return serialize(value, options);
        } else {
            return super.serialize(value, options);
        }
    }
    
    unserialize(value: any, options?: SerializationOptions): any {

        if (this.allowPlainValue && typeof value == "string") {
            return unserialize(value, String, options);
        } else {
            return super.serialize(value, options);
        }
    }
    
}