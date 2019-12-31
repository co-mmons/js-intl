import { Unit } from "@formatjs/intl-relativetimeformat";
export declare function selectUnit(from: Date | number, to?: Date | number, thresholds?: Record<"day" | "hour" | "minute" | "month" | "second" | "week" | "quarter", number>): {
    value: number;
    unit: Unit;
};
export declare const DEFAULT_THRESHOLDS: Record<"second" | "minute" | "hour" | "day" | "week" | "month" | "quarter", number>;
