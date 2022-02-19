/**
 * An object, whose keys are locales.
 */
export interface IntlStore<V = string> {
    [locale: string]: V;
}

export namespace IntlObject {

    export function value<V>(value: IntlStore<V>, locale?: string): V {

        if (value) {
            return value[locale];
        }

        return undefined;
    }

    export function clone<V>(value: IntlStore<V>): IntlStore<V> {

        if (!value) {
            return value;
        }

        let niu: IntlStore<V> = {};

        for (let i in value) {
            niu[i] = value[i];
        }

        return niu;
    }
}
