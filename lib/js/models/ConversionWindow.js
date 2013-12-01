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