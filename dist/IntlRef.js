"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlRef = void 0;
const tslib_1 = require("tslib");
const json_1 = require("@co.mmons/js-utils/json");
let IntlRef = class IntlRef {
    constructor(type) {
        this.refType = type;
        if (!type) {
            throw new Error("IntlRef must have type defined");
        }
    }
};
IntlRef = tslib_1.__decorate([
    (0, json_1.serializable)(),
    tslib_1.__metadata("design:paramtypes", [String])
], IntlRef);
exports.IntlRef = IntlRef;
//# sourceMappingURL=IntlRef.js.map