export var IntlObject;
(function (IntlObject) {
    function value(value, locale) {
        if (value) {
            return value[locale];
        }
        return undefined;
    }
    IntlObject.value = value;
    function clone(value) {
        if (!value) {
            return value;
        }
        let niu = {};
        for (let i in value) {
            niu[i] = value[i];
        }
        return niu;
    }
    IntlObject.clone = clone;
})(IntlObject || (IntlObject = {}));
//# sourceMappingURL=IntlStore.js.map