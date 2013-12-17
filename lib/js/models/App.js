var App;

(function($, _, Converter, CategoryMenu, ConversionWindow, Calculator, Conversions, UnitPicker){
    'use strict';

    App = function(el) {
        this.el = el;
        this.$el = $(el);
    };

    _.extend(App.prototype, {
        init: function() {
            _.bindAll(this, '_handleToggleClick', '_handleSwipeLeft', '_handleSwipeRight', 'updateUnitType', '_handleMenuItemClick', '_handlePercent', '_handleDigit', '_handleDecimal', '_handleClear', '_handleInvert', '_handleAdd', '_handleSubtract', '_handleDivide', '_handleMultiply', '_handleEvaluate', 'updateConversions', '_handleChooseFromUnit', '_handleChooseToUnit');

            var self = this;

            self.ui = {
                toggle: self.$el.find('.toggle'),
                menu: self.$el.find('.unit-category'),
                conversions: self.$el.find('.conversions'),
                calc: self.$el.find('.calc'),
                stage: self.$el.find('.stage')
            };

            self.converter = new Converter(Conversions);
            self.menu = new CategoryMenu(this.ui.menu[0], this.converter.getUnitTypes());
            self.conversion = new ConversionWindow(this.ui.conversions[0]);
            self.calc = new Calculator(this.ui.calc[0]);

            self.silentClear = true;
            self.silentDigit = false;

            self.ui.toggle.hammer().on({
                tap: self._handleToggleClick
            });

            self.$el.find('.stage').hammer().on({
                dragleft: self._handleSwipeLeft,
                dragright: self._handleSwipeRight
            });

            self.menu.$el.bind({
                'click:item': self._handleMenuItemClick
            });

            self.conversion.$el.bind({
                'change:fromValue': self.updateConversions,
                'clear:fromValue': self._handleClear,
                'choose:from:unit': self._handleChooseFromUnit,
                'choose:to:unit': self._handleChooseToUnit
            });

            self.calc.$el.bind({
                'digit': self._handleDigit,
                'decimal': self._handleDecimal,
                'percent': self._handlePercent,
                'clear': self._handleClear,
                'invert': self._handleInvert,
                'add': self._handleAdd,
                'subtract': self._handleSubtract,
                'divide': self._handleDivide,
                'multiply': self._handleMultiply,
                'evaluate': self._handleEvaluate
            });

            this.updateUnitType(_.first(_.keys(this.converter.getUnitTypes())));
        },

        getSilentClear: function () {
            return this.silentClear;
        },

        setSilentClear: function (val) {
            this.silentClear = val;
        },

        getSilentDigit: function () {
            return this.silentDigit;
        },

        setSilentDigit: function (val) {
            this.silentDigit = val;
        },

        toggleOpen: function(isOpen) {
            if(_.isUndefined(isOpen)) { isOpen = !this.isOpen(); }
            this.$el.toggleClass('menu-open', isOpen);
        },

        isOpen: function() {
            return this.$el.hasClass('menu-open');
        },

        updateConversions: function () {
            console.log('Convert ' + this.conversion.getFromValue(true) + ' ' + this.conversion.getFromUnit() + ' to ' + this.conversion.getToUnit());
            var converted = this.converter.convert(this.conversion.getFromValue(true), this.conversion.getFromUnit(), this.conversion.getToUnit());
            this.conversion.setToValue(this._roundDecimal(converted, 10));
        },

        updateUnitType: function (item) {
            this.toggleOpen(false);
            this.converter.setUnitType(item);
            this.menu.setActive(this.converter.getUnitType());
            this.conversion.setFromUnit(this.converter.getDefaultFromUnit(), this.converter.getUnit(this.converter.getDefaultFromUnit()));
            this.conversion.setToUnit(this.converter.getDefaultToUnit(), this.converter.getUnit(this.converter.getDefaultToUnit()));this._handleClear();
        },

        _operationPrep: function () {
            this.calc.evaluate();
            this.setSilentClear(true);
            this.setSilentDigit(true);
        },

        _handleToggleClick: function () {
            this.toggleOpen();
        },

        _handleSwipeLeft: function () {
            this.toggleOpen(false);
        },

        _handleSwipeRight: function () {
            this.toggleOpen(true);
        },

        _handleMenuItemClick: function (e, item) {
            this.updateUnitType(item);
        },

        _handleDigit: function (e, digit) {
            var val = (this.getSilentClear()) ? digit : this.conversion.getFromValue() + digit;
            this.conversion.setFromValue(val, this.getSilentDigit());
            this.setSilentClear(false);
        },

        _handleDecimal: function () {
            // Make sure there isn't already a decimal
            if (this.conversion.getFromValue().indexOf('.') === -1) {
                this.conversion.setFromValue(this.conversion.getFromValue() + '.', this.getSilentDigit());
            } else if (this.getSilentClear()) {
                this.conversion.setFromValue('0.', this.getSilentDigit());
            }

            this.setSilentClear(false);
        },

        _handlePercent: function () {
            this.conversion.setFromValue(this.conversion.getFromValue(true) / 100);
        },

        _handleClear: function () {
            this.calc.evaluate();
            this.conversion.setFromValue(0, this.getSilentDigit());
            this.setSilentClear(true);
            this.setSilentDigit(false);
        },

        _handleChooseFromUnit: function () {
            var self = this,
                view = new UnitPicker(self.converter.getUnits());

            view.$el.one('new:unit', function (e, unit) {
                console.log(unit);
                console.log(self.converter.getUnits()[unit]);
                self.conversion.setFromUnit(unit, self.converter.getUnits()[unit]);
                self.updateConversions();
                view.destroy();
            });

            view.setActive(self.conversion.getFromUnit());
            self.$el.prepend(view.$el);
            view.show();
        },

        _handleChooseToUnit: function () {
            var self = this,
                view = new UnitPicker(self.converter.getUnits());

            view.$el.one('new:unit', function (e, unit) {
                self.conversion.setToUnit(unit, self.converter.getUnits()[unit]);self.updateConversions();
                view.destroy();
            });

            view.setActive(self.conversion.getToUnit());
            self.$el.prepend(view.$el);
            view.show();
        },

        _handleInvert: function () {
            if(this.conversion.getFromValue(true) === 0) {
                this.conversion.setFromValue('-', true);
            } else {
                this.conversion.setFromValue(this.conversion.getFromValue(true) * -1, this.getSilentDigit());
            }

            this.setSilentClear(false);

        },

        _handleAdd: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('new:operation', function () {
                console.log('forgetting operation');
                self.calc.$el.off('evaluate');
            });

            self.calc.$el.one('evaluate', function () {
                console.log('performing operation');
                self.calc.$el.off('new:operation');
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem + self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        _handleSubtract: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem - self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        _handleDivide: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem / self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        _handleMultiply: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem * self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        _handleEvaluate: function () {
            this.setSilentClear(true);
            this.setSilentDigit(false);
        },

        _roundDecimal: function (number, places) {
            var rounded = +(Math.round(number + ("e+" + places))  + ("e-" + places));
            return _.isNaN(rounded) ? Math.round(number) : rounded;
        }
    });
})(jQuery, window._, window.Converter, window.CategoryMenu, window.ConversionWindow, window.Calculator, window.Conversions, window.UnitPicker);