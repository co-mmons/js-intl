"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleStringSerializer = void 0;
const json_1 = require("@co.mmons/js-utils/json");
const Locale_1 = require("./Locale");
class LocaleStringSerializer extends json_1.Serializer {
    unserialize(json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        return Locale_1.Locale.fromJSON(json);
    }
    serialize(object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else if (object instanceof Locale_1.Locale) {
            return object.code;
        }
        return object.toJSON();
    }
}
exports.LocaleStringSerializer = LocaleStringSerializer;
//# sourceMappingURL=LocaleStringSerializer.js.map