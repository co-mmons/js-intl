import { Unit } from "@formatjs/intl-relativetimeformat";
export declare function selectUnit(from: Date | number, to?: Date | number, thresholds?: Record<"hour" | "minute" | "second", number>): {
    value: number;
    unit: Unit;
};
export declare const DEFAULT_THRESHOLDS: Record<'second' | 'minute' | 'hour', number>;
