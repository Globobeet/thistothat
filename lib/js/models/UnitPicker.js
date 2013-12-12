var UnitPicker;

(function($, _){
    'use strict';

    UnitPicker = function(units) {
        this.units = units;
        this.$el = $('<div class="unit-picker" style="display: none;" />');
        this.init();
    };

    _.extend(UnitPicker.prototype, {
        init: function() {
            _.bindAll(this, '_handleUnitTap');

            this._renderUnits();
        },

        _renderUnits: function () {
            var self = this;

            _.each(_.keys(self.units), function (unit) {
                self.$el.append('<li><button type="button" data-symbol="' + self.units[unit].symbol + '" data-unit="' + unit + '">' + self.units[unit].label + '</button></li>');
            });

            self.$el.wrapInner('<nav><ul /></nav>');
        },

        show: function () {
            var self = this;

            self.$el.find('button').hammer().on({
                tap: self._handleUnitTap
            });

            self.$el.fadeIn(300);
        },

        destroy: function () {
            var self = this;

            self.$el.fadeOut(100, function () {
                self.$el.remove();
            });
        },

        clearActive: function () {
            this.$el.find('.active').removeClass('active');
        },

        setActive: function (unit) {
            this.$el.find('[data-symbol="' + unit + '"]').closest('li').addClass('active');
        },

        _handleUnitTap: function (e) {
            this.clearActive();
            this.setActive($(e.currentTarget).attr('data-symbol'));
            this.$el.trigger('new:unit', $(e.currentTarget).attr('data-unit'));
        }
    });
})(jQuery, window._);