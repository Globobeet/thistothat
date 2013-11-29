var ConversionWindow;

(function($, _){
    ConversionWindow = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(ConversionWindow.prototype, {
        init: function() {
            var self = this;

            self.ui = {
                from: self.$el.find('.convert-from'),
                to: self.$el.find('.convert-to')
            };
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
        }
    });
})(jQuery, window._);