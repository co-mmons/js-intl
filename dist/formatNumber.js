"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = void 0;
const bignumber_js_1 = require("bignumber.js");
const Currency_1 = require("./Currency");
const Money_1 = require("./Money");
function formatNumber(context, mode, value, predefinedOptionsOrOptions, additionalOptions) {
    const options = Object.assign({}, typeof predefinedOptionsOrOptions === "string" ? context.findPredefinedFormatOptions(predefinedOptionsOrOptions) : predefinedOptionsOrOptions, additionalOptions);
    if (mode == "currency") {
        options.style = "currency";
    }
    else if (mode == "percent") {
        options.style = "percent";
    }
    else {
        options.style = "decimal";
    }
    if (value instanceof Money_1.Money) {
        if (mode == "currency") {
            options.currency = value.currency.code;
        }
        value = value.amount.toNumber();
    }
    else if (value instanceof bignumber_js_1.BigNumber) {
        value = value.toNumber();
    }
    else if (Array.isArray(value) && value) {
        if (mode == "currency") {
            if (value[0] instanceof Currency_1.Currency) {
                options.currency = value[0].code;
            }
            else if (value[0]) {
                options.currency = value[0];
            }
        }
        if (value[1] instanceof bignumber_js_1.BigNumber) {
            value = value[1].toNumber();
        }
        else {
            value = value[1];
        }
    }
    return new Intl.NumberFormat(context.locales, options).format(value);
}
exports.formatNumber = formatNumber;
//# sourceMappingURL=formatNumber.js.map