import {Type} from "@co.mmons/js-utils/core";
import {Serializer} from "@co.mmons/js-utils/json";
import {ObjectAsMapSerializer} from "@co.mmons/js-utils/json/serializers";

export class IntlValueSerializer extends ObjectAsMapSerializer {

    constructor(valueType: Type | Serializer) {
        super(valueType);
    }

}
