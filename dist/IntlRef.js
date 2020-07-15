"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlRef = void 0;
var tslib_1 = require("tslib");
var json_1 = require("@co.mmons/js-utils/json");
var IntlRef = /** @class */ (function () {
    function IntlRef(type) {
        this.refType = type;
        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }
    IntlRef = tslib_1.__decorate([
        json_1.serializable(),
        tslib_1.__metadata("design:paramtypes", [String])
    ], IntlRef);
    return IntlRef;
}());
exports.IntlRef = IntlRef;
//# sourceMappingURL=IntlRef.js.map