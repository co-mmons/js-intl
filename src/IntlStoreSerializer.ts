import {Type} from "@co.mmons/js-utils/core";
import {ObjectAsMapSerializer, Serializer} from "@co.mmons/js-utils/json";

export class IntlStoreSerializer extends ObjectAsMapSerializer {

    constructor(valueType: Type | Serializer) {
        super(valueType);
    }

}
