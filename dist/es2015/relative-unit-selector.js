"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
function selectUnit(from, to = Date.now(), thresholds = exports.DEFAULT_THRESHOLDS) {
    const secs = date_fns_1.differenceInSeconds(from, to);
    if (Math.abs(secs) < thresholds.second) {
        return {
            value: Math.round(secs),
            unit: "second"
        };
    }
    const mins = secs / 60;
    if (Math.abs(mins) < thresholds.minute) {
        return {
            value: Math.round(mins),
            unit: "minute"
        };
    }
    const hours = mins / 60;
    if (Math.abs(hours) < thresholds.hour) {
        return {
            value: Math.round(hours),
            unit: "hour"
        };
    }
    const days = date_fns_1.differenceInCalendarDays(from, to);
    if (Math.abs(days) < thresholds.day) {
        return {
            value: Math.round(days),
            unit: "day"
        };
    }
    const weeks = date_fns_1.differenceInCalendarWeeks(from, to);
    if (Math.abs(weeks) < thresholds.week) {
        return {
            value: Math.round(weeks),
            unit: "week"
        };
    }
    const months = date_fns_1.differenceInCalendarMonths(from, to);
    if (Math.abs(months) < thresholds.month) {
        return {
            value: Math.round(months),
            unit: "month"
        };
    }
    const quarters = date_fns_1.differenceInCalendarQuarters(from, to);
    if (Math.abs(quarters) < thresholds.quarter) {
        return {
            value: Math.round(quarters),
            unit: "quarter"
        };
    }
    const years = date_fns_1.differenceInCalendarYears(from, to);
    if (Math.abs(years) > 0) {
        return {
            value: Math.round(years),
            unit: "year"
        };
    }
}
exports.selectUnit = selectUnit;
exports.DEFAULT_THRESHOLDS = {
    second: 45,
    minute: 45,
    hour: 22,
    day: 7,
    week: 4,
    month: 12,
    quarter: 0 // quarters to year
};
//# sourceMappingURL=relative-unit-selector.js.map