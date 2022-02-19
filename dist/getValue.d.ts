import { IntlContext } from "./IntlContext";
import { MessageRef } from "./MessageRef";
import { ValueKey } from "./ValueKey";
import { ValueRef } from "./ValueRef";
export declare function getValue<T extends string | number = string>(context: IntlContext, key: ValueKey | MessageRef | ValueRef): T;
