var Converter;

(function(_) {
    Converter = function (conversions) {
        this.conversions = conversions;
        this.unitType = null;
    };

    _.extend(Converter.prototype, {
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

        setUnitType: function (type) {
            if (this.conversions[type] === undefined) {
                throw "unknown type";
            }

            this.unitType = type;
        },

        convertAll: function (value) {

        },

        convert: function (value, fromUnit, toUnit) {
            var units = this.conversions[this.unitType].units;
            var convertedValue = null;

            if (units[fromUnit] === undefined) {
                throw "unknown from unit " + fromUnit + " of type " + this.unitType;
            }

            if (units[toUnit] === undefined) {
                throw "unknown to unit " + toUnit + " of type " + this.unitType;
            }

            if (units[fromUnit].def[toUnit] !== undefined) {
                return value * units[fromUnit].def[toUnit];
            }

            for (var u in units[fromUnit].def) {
                convertedValue = this.convert(value * units[fromUnit].def[u], u, toUnit);

                if (convertedValue !== null) {
                    return convertedValue;
                }
            }

            return null;
        }
    });
})(window._);