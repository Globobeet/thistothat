var ConversionWindow;

(function($, _){
    ConversionWindow = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(ConversionWindow.prototype, {
        init: function() {
            _.bindAll(this, '_handleSwipeLeft');

            var self = this;

            self.ui = {
                from: self.$el.find('.convert-from'),
                to: self.$el.find('.convert-to')
            };

            self.ui.from.hammer().on({
                swipeleft: self._handleSwipeLeft
            });
        },

        getFromValue: function (asNumber) {
            return (asNumber) ? Number(this.ui.from.find('.value').text()) : this.ui.from.find('.value').text();
        },

        setFromValue: function (val, silent) {
            this.ui.from.find('.value').text(val);
            if(!silent) { this.triggerChange(); }
        },

        getFromUnit: function() {
            return this.ui.from.find('.unit').attr('data-unit');
        },

        setFromUnit: function (unitId, obj) {
            this.ui.from.find('.unit').text(obj.symbol).attr('data-unit', unitId);
        },

        setToValue: function (val) {
            this.ui.to.find('.value').text(val);
        },

        getToUnit: function() {
            return this.ui.to.find('.unit').attr('data-unit');
        },

        setToUnit: function (unitId, obj) {
            this.ui.to.find('.unit').text(obj.symbol).attr('data-unit', unitId);
        },

        triggerChange: function () {
            this.$el.trigger('change:fromValue', this.getFromValue());
        },

        backspace: function () {
            if(this.getFromValue().length > 1) {
                this.setFromValue(this.getFromValue().substring(0, this.getFromValue().length - 1));
            } else {
                this.$el.trigger('clear:fromValue');
            }
        },

        _handleSwipeLeft: function () {
            this.backspace();
            return false;
        }
    });
})(jQuery, window._);