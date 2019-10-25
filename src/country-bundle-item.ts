import {IntlBundleItem} from "./bundle-generator";

export default function countryIntlBundleItem(node_modules: string = "node_modules"): IntlBundleItem {
    return {path: `${node_modules}/@umpirsky/country-list/data/{{LOCALE}}/country.json`, type: "message", namespace: "@umpirsky/country-list"};
}
