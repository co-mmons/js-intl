import {SerializationOptions, Serializer} from "@co.mmons/js-utils/json";
import {Money} from "./Money";

export class MoneyStringSerializer extends Serializer {

    unserialize(json: any, options: SerializationOptions | undefined): any {

        if (this.isUndefinedOrNull(json)) {
            return json;
        }

        return Money.fromJSON(json);
    }

    serialize(object: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(object)) {
            return object;
        } else if (object instanceof Money) {
            return object.toString();
        }

        return object.toJSON();
    }
}
