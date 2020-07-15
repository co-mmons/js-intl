"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlRef = void 0;
var IntlRef = /** @class */ (function () {
    function IntlRef(type) {
        this.refType = type;
        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }
    return IntlRef;
}());
exports.IntlRef = IntlRef;
//# sourceMappingURL=IntlRef.js.map