import { __decorate, __metadata } from "tslib";
import { serializable } from "@co.mmons/js-utils/json";
let IntlRef = class IntlRef {
    constructor(type) {
        this.refType = type;
        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }
};
IntlRef = __decorate([
    serializable(),
    __metadata("design:paramtypes", [String])
], IntlRef);
export { IntlRef };
//# sourceMappingURL=IntlRef.js.map