import { MessageRef } from "./MessageRef";
import { ValueRef } from "./ValueRef";
export declare function extractNamespaceAndKey(namespaceAndKey: string | MessageRef | ValueRef, defaultNamespace?: string): {
    namespace: string;
    key: string;
};
