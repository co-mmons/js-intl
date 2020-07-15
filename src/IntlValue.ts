export interface IntlValue<V = string> {
    [locale: string]: V;
}

export namespace IntlValue {

    export function value<V>(value: IntlValue<V>, locale?: string): V {

        if (value) {
            return value[locale];
        }

        return undefined;
    }

    export function clone<V>(value: IntlValue<V>): IntlValue<V> {

        if (!value) {
            return value;
        }

        let niu: IntlValue<V> = {};

        for (let i in value) {
            niu[i] = value[i];
        }

        return niu;
    }
}
