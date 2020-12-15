import {SerializationOptions, Serializer} from "@co.mmons/js-utils/json";
import {Locale} from "./Locale";

export class LocaleStringSerializer extends Serializer {

    unserialize(json: any, options: SerializationOptions | undefined): any {

        if (this.isUndefinedOrNull(json)) {
            return json;
        }

        return Locale.fromJSON(json);
    }

    serialize(object: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(object)) {
            return object;
        } else if (object instanceof Locale) {
            return object.code;
        }

        return object.toJSON();
    }
}