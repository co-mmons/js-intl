"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlRef = void 0;
class IntlRef {
    constructor(type) {
        this.refType = type;
        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }
}
exports.IntlRef = IntlRef;
//# sourceMappingURL=IntlRef.js.map