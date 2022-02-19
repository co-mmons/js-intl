import {serializable} from "@co.mmons/js-utils/json";

type RefType = "value" | "message" | "decimalFormat";

@serializable()
export abstract class IntlRef {

    protected constructor(type: RefType) {
        this.refType = type;

        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }

    protected readonly refType: RefType;

}
