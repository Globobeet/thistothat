var Converter;

(function(_) {
    Converter = function (conversions) {
        this.conversions = conversions;
        this.unitType = null;
    };

    _.extend(Converter.prototype, {
        getUnitTypes: function () {
            return _.mapValues(this.conversions, function (x) {
                return {
                    label: x.name,
                    default: x.default
                };
            });
        },

        getUnit: function (unit) {
            return this.getUnits()[unit];
        },

        getDefaultFromUnit: function () {
            return this.getUnitTypes()[this.getUnitType()].default[0];
        },

        getDefaultToUnit: function () {
            return this.getUnitTypes()[this.getUnitType()].default[1];
        },

        getUnits: function (type) {
            type = type || this.getUnitType();

            return _.mapValues(this.conversions[type].units, function (x) {
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

        getUnitType: function () {
            return this.unitType;
        },

        convertAll: function (value) {

        },

        convert: function (value, fromUnit, toUnit) {
            var result = this.tryConvert(value, fromUnit, toUnit);
            if (_.isNull(result)) {
                throw 'No way to convert' + fromUnit + ' to ' + toUnit;
            } else {
                return result;
            }
        },

        tryConvert: function (value, fromUnit, toUnit) {
            var units = this.conversions[this.getUnitType()].units;
            var convertedValue = null;

            if (units[fromUnit] === undefined) {
                throw "unknown from unit " + fromUnit + " of type " + this.getUnitType();
            }

            if (units[toUnit] === undefined) {
                throw "unknown to unit " + toUnit + " of type " + this.getUnitType();
            }

            // If a direct conversion can be made
            if (!_.isUndefined(units[fromUnit].conv[toUnit])) {
                return value * units[fromUnit].conv[toUnit];
            }

            // Iterate through units to find a possible conversion
            for (var u in units[fromUnit].conv) {
                convertedValue = this.convert(value * units[fromUnit].conv[u], u, toUnit);

                if (!_.isNull(convertedValue)) {
                    return convertedValue;
                }
            }

            // No conversion found
            return null;
        }
    });
})(window._);