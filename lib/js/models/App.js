var App;

(function($, _, CategoryMenu, ConversionWindow, Calculator){
    App = function(el) {
        this.el = el;
        this.$el = $(el);
    };

    _.extend(App.prototype, {
        init: function() {
            _.bindAll(this, '_handleToggleClick', '_handleSwipeLeft', '_handleSwipeRight', '_handleChangeActive', 'updateConversions', '_handleDigit', '_handleDecimal', '_handleClear', '_handleInvert', '_handleAdd', '_handleSubtract', '_handleDivide', '_handleMultiply', '_handleEvaluate');

            var self = this;

            self.ui = {
                toggle: self.$el.find('.toggle'),
                menu: self.$el.find('.unit-category'),
                conversions: self.$el.find('.conversions'),
                calc: self.$el.find('.calc'),
                stage: self.$el.find('.stage')
            };

            self.menu = this.getMenu();
            self.conversion = this.getConversion();
            self.calc = this.getCalc();

            self.silentClear = true;
            self.silentDigit = false;

            self.ui.toggle.hammer().on({
                tap: self._handleToggleClick
            });

            self.$el.hammer().on({
                dragleft: self._handleSwipeLeft,
                dragright: self._handleSwipeRight
            });

            self.menu.$el.bind({
                'change:active': self._handleChangeActive
            });

            self.conversion.$el.bind({
                'change:fromValue': self.updateConversions
            });

            self.calc.$el.bind({
                'digit': self._handleDigit,
                'decimal': self._handleDecimal,
                'clear': self._handleClear,
                'invert': self._handleInvert,
                'add': self._handleAdd,
                'subtract': self._handleSubtract,
                'divide': self._handleDivide,
                'multiply': self._handleMultiply,
                'evaluate': self._handleEvaluate
            });
        },

        getMenu: function () {
            return new CategoryMenu(this.ui.menu[0]);
        },

        getConversion: function () {
            return new ConversionWindow(this.ui.conversions[0]);
        },

        getCalc: function () {
            return new Calculator(this.ui.calc[0]);
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
            console.log('Update conversions based on: ' + this.conversion.getFromValue(true));
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

        _handleChangeActive: function (e, item) {
            this.toggleOpen(false);
            console.log('New active: ' + item);
        },

        _handleDigit: function (e, digit) {
            var val = (this.getSilentClear()) ? digit : this.conversion.getFromValue() + digit;
            this.conversion.setFromValue(val, this.getSilentDigit());
            this.setSilentClear(false);
        },

        _handleDecimal: function () {
            // Make sure there isn't already a decimal
            if (!_.contains(_.toArray(this.conversion.getFromValue()), '.') {
                this.conversion.setFromValue(this.conversion.getFromValue() + '.', this.getSilentDigit());
            } else if (this.getSilentClear()) {
                this.conversion.setFromValue('0.', this.getSilentDigit());
                this.setSilentClear(false);
            }
        },

        _handleClear: function () {
            this.calc.evaluate();
            this.conversion.setFromValue(0, this.getSilentDigit());
            this.setSilentClear(true);
            this.setSilentDigit(false);
        },

        _handleInvert: function () {
            this.conversion.setFromValue(this.conversion.getFromValue(true) * -1, this.getSilentDigit());
        },

        _handleAdd: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
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
        }
    });
})(jQuery, window._, window.CategoryMenu, window.ConversionWindow, window.Calculator);