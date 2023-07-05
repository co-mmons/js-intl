import { MessageRef } from "./MessageRef";
import { ValueRef } from "./ValueRef";
export declare function extractNamespaceAndKey(namespaceAndKey: string | MessageRef | ValueRef | [namespace: string, key: string], defaultNamespace?: string): {
    namespace: string;
    key: string;
};
