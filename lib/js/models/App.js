var App;

(function($, _, CategoryMenu, ConversionWindow, Calculator){
    App = function(el) {
        this.el = el;
        this.$el = $(el);
    };

    _.extend(App.prototype, {
        init: function() {
            _.bindAll(this, 'handleToggleClick', 'handleSwipeLeft', 'handleSwipeRight', 'handleChangeActive', 'updateConversions', 'handleDigit', 'handleDecimal', 'handleClear', 'handleInvert', 'handleAdd', 'handleSubtract', 'handleDivide', 'handleMultiply', 'handleEvaluate');

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
                tap: self.handleToggleClick
            });

            self.$el.hammer().on({
                dragleft: self.handleSwipeLeft,
                dragright: self.handleSwipeRight
            });

            self.menu.$el.bind({
                'change:active': self.handleChangeActive
            });

            self.conversion.$el.bind({
                'change:fromValue': self.updateConversions
            });

            self.calc.$el.bind({
                'digit': self.handleDigit,
                'decimal': self.handleDecimal,
                'clear': self.handleClear,
                'invert': self.handleInvert,
                'add': self.handleAdd,
                'subtract': self.handleSubtract,
                'divide': self.handleDivide,
                'multiply': self.handleMultiply,
                'evaluate': self.handleEvaluate
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

        handleToggleClick: function () {
            this.toggleOpen();
        },

        handleSwipeLeft: function () {
            this.toggleOpen(false);
        },

        handleSwipeRight: function () {
            this.toggleOpen(true);
        },

        handleChangeActive: function (e, item) {
            this.toggleOpen(false);
            console.log('New active: ' + item);
        },

        updateConversions: function () {
            console.log('Update conversions based on: ' + this.conversion.getFromValue(true));
        },

        handleDigit: function (e, digit) {
            var val = (this.getSilentClear()) ? digit : this.conversion.getFromValue() + digit;
            this.conversion.setFromValue(val, this.getSilentDigit());
            this.setSilentClear(false);
        },

        handleDecimal: function () {
            // Make sure there isn't already a decimal
            if(this.conversion.getFromValue(true) === _.parseInt(this.conversion.getFromValue(true))) {
                this.conversion.setFromValue(this.conversion.getFromValue() + '.', this.getSilentDigit());
            }
        },

        handleClear: function () {
            this.conversion.setFromValue(0, this.getSilentDigit());
            this.setSilentClear(true);
        },

        handleInvert: function () {
            this.conversion.setFromValue(this.conversion.getFromValue(true) * -1, this.getSilentDigit());
        },

        _operationPrep: function () {
            this.calc.handleEvaluateClick();
            this.setSilentClear(true);
            this.setSilentDigit(true);
        },

        handleAdd: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem + self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        handleSubtract: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem - self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        handleDivide: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem / self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        handleMultiply: function () {
            this._operationPrep();

            var self = this,
                mem = self.conversion.getFromValue(true);

            self.calc.$el.one('evaluate', function () {
                self.setSilentDigit(false);
                self.conversion.setFromValue(mem * self.conversion.getFromValue(true), self.getSilentDigit());
            });
        },

        handleEvaluate: function () {
            this.setSilentClear(true);
        }
    });
})(jQuery, window._, window.CategoryMenu, window.ConversionWindow, window.Calculator);