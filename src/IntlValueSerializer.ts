import {ObjectAsMapSerializer, Serializer} from "@co.mmons/js-utils/json";

export class IntlValueSerializer extends ObjectAsMapSerializer {

    constructor(valueType: any | Serializer) {
        super(valueType);
    }

}
