import { DateTimezone, Timestamp, TimeZoneDate } from "@co.mmons/js-utils/core";
import { IntlContext } from "./IntlContext";
export declare function formatTimeOrDateOrDateTime(context: IntlContext, mode: "time" | "date" | "dateTime", dateTime: number | Date | DateTimezone | TimeZoneDate | Timestamp, predefinedOptionsOrOptions?: string | Intl.DateTimeFormatOptions, options?: Intl.DateTimeFormatOptions): string;
