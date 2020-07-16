import { Type } from "@co.mmons/js-utils/core";
import { Serializer } from "@co.mmons/js-utils/json";
import { ObjectAsMapSerializer } from "@co.mmons/js-utils/json/serializers";
export declare class IntlValueSerializer extends ObjectAsMapSerializer {
    constructor(valueType: Type | Serializer);
}
