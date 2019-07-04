import { differenceInCalendarDays, differenceInCalendarQuarters, differenceInCalendarYears, differenceInSeconds, differenceInCalendarMonths, differenceInCalendarWeeks } from "date-fns";
export function selectUnit(from, to, thresholds) {
    if (to === void 0) { to = Date.now(); }
    if (thresholds === void 0) { thresholds = DEFAULT_THRESHOLDS; }
    var secs = differenceInSeconds(from, to);
    if (Math.abs(secs) < thresholds.second) {
        return {
            value: Math.round(secs),
            unit: 'second'
        };
    }
    var mins = secs / 60;
    if (Math.abs(mins) < thresholds.minute) {
        return {
            value: Math.round(mins),
            unit: 'minute'
        };
    }
    var hours = mins / 60;
    if (Math.abs(hours) < thresholds.hour) {
        return {
            value: Math.round(hours),
            unit: 'hour'
        };
    }
    var years = differenceInCalendarYears(from, to);
    if (Math.abs(years) > 0) {
        return {
            value: Math.round(years),
            unit: 'year'
        };
    }
    var quarters = differenceInCalendarQuarters(from, to);
    if (Math.abs(quarters) > 1) {
        return {
            value: Math.round(quarters),
            unit: 'quarter'
        };
    }
    var months = differenceInCalendarMonths(from, to);
    if (Math.abs(months) > 0) {
        return {
            value: Math.round(months),
            unit: 'month'
        };
    }
    var weeks = differenceInCalendarWeeks(from, to);
    if (Math.abs(weeks) > 0) {
        return {
            value: Math.round(weeks),
            unit: 'week'
        };
    }
    var days = differenceInCalendarDays(from, to);
    return {
        value: Math.round(days),
        unit: 'day'
    };
}
export var DEFAULT_THRESHOLDS = {
    second: 45,
    minute: 45,
    hour: 22 // hour to day
};
//# sourceMappingURL=relative-unit-selector.js.map