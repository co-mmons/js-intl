import {Unit} from "@formatjs/intl-relativetimeformat";
import {
    differenceInCalendarDays,
    differenceInCalendarQuarters,
    differenceInCalendarYears,
    differenceInSeconds,
    differenceInCalendarMonths,
    differenceInCalendarWeeks
} from "date-fns";

export function selectUnit(from: Date | number, to: Date | number = Date.now(), thresholds = DEFAULT_THRESHOLDS): {value: number; unit: Unit} {

    const secs = differenceInSeconds(from, to);
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

    const days = differenceInCalendarDays(from, to);
    if (Math.abs(days) < thresholds.day) {
        return {
            value: Math.round(days),
            unit: "day"
        };
    }

    const weeks = differenceInCalendarWeeks(from, to);
    if (Math.abs(weeks) < thresholds.week) {
        return {
            value: Math.round(weeks),
            unit: "week"
        };
    }

    const months = differenceInCalendarMonths(from, to);
    if (Math.abs(months) < thresholds.month) {
        return {
            value: Math.round(months),
            unit: "month"
        };
    }

    const quarters = differenceInCalendarQuarters(from, to);
    if (Math.abs(quarters) < thresholds.quarter) {
        return {
            value: Math.round(quarters),
            unit: "quarter"
        };
    }

    const years = differenceInCalendarYears(from, to);
    if (Math.abs(years) > 0) {
        return {
            value: Math.round(years),
            unit: "year"
        };
    }

}

export const DEFAULT_THRESHOLDS: Record<"second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" , number> = {
    second: 45, // seconds to minute
    minute: 45, // minutes to hour
    hour: 22, // hour to day
    day: 7, // days to week
    week: 4, // weeks to month
    month: 12, // months to quarter
    quarter: 0 // quarters to year
};
