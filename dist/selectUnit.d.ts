export declare function selectUnit(from: Date | number, to?: Date | number, thresholds?: Record<"day" | "hour" | "minute" | "month" | "second" | "quarter" | "week", number>): {
    value: number;
    unit: string;
};
export declare const DEFAULT_THRESHOLDS: Record<"second" | "minute" | "hour" | "day" | "week" | "month" | "quarter", number>;
