var Converter;

(function(_) {
    Converter = function (conversions) {
        this.conversions = conversions;
        this.originType = null;
        this.originUnit = null;
    };

    _.extend(Calculator.prototype, {
        getTypes: function () {
            return _.mapValues(this.conversions, function (x) {
                return {
                    label: x.name,
                    default: x.default
                };
            });
        },

        getUnits: function (type) {
            return _.mapValues(this.conversions[type], function (x) {
                return {
                    label: x.name,
                    symbol: x.symbol
                };
            });
        },

        setOriginUnit: function (type, unit) {
            this.originType = type;
            this.originUnit = unit;
        },

        convertAll: function (value) {

        },

        convert: function (toUnit, value) {

        }
    });
})(window._);