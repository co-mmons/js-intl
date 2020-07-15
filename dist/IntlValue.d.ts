export interface IntlValue<V = string> {
    [locale: string]: V;
}
export declare namespace IntlValue {
    function value<V>(value: IntlValue<V>, locale?: string): V;
    function clone<V>(value: IntlValue<V>): IntlValue<V>;
}
