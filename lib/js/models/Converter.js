var Converter;

(function(_) {
    'use strict';

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

        convertAll: function (value, fromUnit) {
            var self = this;
            return _.mapValues(this.conversions[this.getUnitType()].units, function (x, toUnit) {
                if (toUnit === fromUnit) {
                    return null;
                }

                return {
                    label: x.name,
                    symbol: x.symbol,
                    value: self.convert(value, fromUnit, toUnit)
                };
            });
        },

        convert: function (value, fromUnit, toUnit) {
            var result = this.tryConvert(value, fromUnit, toUnit, []);
            if (_.isNull(result)) {
                throw 'No way to convert ' + fromUnit + ' to ' + toUnit;
            } else {
                return result;
            }
        },

        tryConvert: function (value, fromUnit, toUnit, conversionsTried) {
            var self = this;
            var units = this.conversions[this.getUnitType()].units;
            var conversionName = fromUnit + ':' + toUnit;
            var convertedValue = null;

            if (_.isUndefined(units[fromUnit])) {
                throw "Unknown 'from' unit " + fromUnit + " of type " + this.getUnitType();
            }

            if (_.isUndefined(units[toUnit])) {
                throw "Unknown 'to' unit " + toUnit + " of type " + this.getUnitType();
            }

            // No conversion necessary
            if (fromUnit === toUnit) return value;

            // Have we tried this conversion before?
            if (_.contains(conversionsTried, conversionName)) {
                return null;
            }

            conversionsTried.push(conversionName);

            // Can a direct conversion can be made?
            if (!_.isUndefined(units[fromUnit].conv[toUnit])) {
                return self._apply(value, units[fromUnit].conv[toUnit]);
            }

            // Iterate through units to find a possible conversion
            _.forOwn(units[fromUnit].conv, function(conversion, unitName) {
                convertedValue = self.tryConvert(self._apply(value, conversion), unitName, toUnit, conversionsTried);
                return _.isNull(convertedValue);
            });

            return convertedValue;
        },

        _apply: function(value, conversion) {
            if (_.isFunction(conversion)) {
                return conversion(value);
            }
            return value * conversion;
        }
    });
})(window._);