import {DateTimezone, Timestamp, TimeZoneDate, LocalDate, NoTimeDate} from "@co.mmons/js-utils/core";
import {IntlContext} from "./IntlContext";

export function formatTimeOrDateOrDateTime(context: IntlContext, mode: "time" | "date" | "dateTime", dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions) {

    let predefinedOptions = typeof predefinedOptionsOrOptions === "string" ? context.findPredefinedFormatOptions(predefinedOptionsOrOptions) : predefinedOptionsOrOptions;

    predefinedOptions = Object.assign({}, predefinedOptions, options);

    if (mode === "time") {

        predefinedOptions.year = undefined;
        predefinedOptions.month = undefined;
        predefinedOptions.day = undefined;
        predefinedOptions.weekday = undefined;
        predefinedOptions.era = undefined;

        if (!predefinedOptions.hour && !predefinedOptions.minute && !predefinedOptions.second && !predefinedOptions.timeZoneName) {
            predefinedOptions.hour = "2-digit";
            predefinedOptions.minute = "2-digit";
            predefinedOptions.second = "2-digit";
        }

    } else if (mode == "date") {

        predefinedOptions.hour = undefined;
        predefinedOptions.minute = undefined;
        predefinedOptions.second = undefined;

        if (!predefinedOptions.year && !predefinedOptions.month && !predefinedOptions.day && !predefinedOptions.weekday && !predefinedOptions.era && !predefinedOptions.timeZoneName) {
            predefinedOptions.year = "numeric";
            predefinedOptions.month = "numeric";
            predefinedOptions.day = "numeric";
        }

    } else {
        predefinedOptions = Object.assign({
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }, predefinedOptions);

    }

    if (dateTime instanceof DateTimezone) {

        if (!dateTime.timezone) {
            predefinedOptions.timeZone = "UTC";
            predefinedOptions.timeZoneName = undefined;
        } else if (dateTime.timezone !== "current") {
            predefinedOptions.timeZone = dateTime.timezone;
        }

        dateTime = dateTime.date;

    } else if (dateTime instanceof LocalDate || dateTime instanceof NoTimeDate) {
        predefinedOptions.timeZone = "UTC";
        predefinedOptions.timeZoneName = undefined;

    } else if (dateTime instanceof TimeZoneDate) {
        predefinedOptions.timeZone = dateTime.timeZone !== "current" && dateTime.timeZone ? dateTime.timeZone : undefined;
        predefinedOptions.timeZoneName = "timeZoneName" in predefinedOptions ? predefinedOptions.timeZoneName : "short";

    } else if (typeof dateTime === "number") {
        dateTime = new Date(dateTime);

    } else if (dateTime && !(dateTime instanceof Date) && typeof dateTime.toDate === "function") {
        dateTime = dateTime.toDate();
    }

    return new Intl.DateTimeFormat(context.locales, predefinedOptions).format(dateTime as Date);
}
