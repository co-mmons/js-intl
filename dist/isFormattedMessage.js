"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormattedMessage = void 0;
function isFormattedMessage(message) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}
exports.isFormattedMessage = isFormattedMessage;
//# sourceMappingURL=isFormattedMessage.js.map