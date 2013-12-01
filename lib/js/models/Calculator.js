var Calculator;

(function($, _){
    Calculator = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(Calculator.prototype, {
        init: function() {
            _.bindAll(this, '_handleDigitClick', '_handleFunctionClick', '_handleOperatorClick', '_handleEvaluateClick');

            var self = this;

            self.$el.find('.digit').hammer().on({
                tap: self._handleDigitClick
            });

            self.$el.find('.function').hammer().on({
                tap: self._handleFunctionClick
            });

            self.$el.find('.operator').hammer().on({
                tap: self._handleOperatorClick
            });

            self.$el.find('.evaluate').hammer().on({
                tap: self._handleEvaluateClick
            });
        },

        _handleDigitClick: function (e) {
            if ($(e.currentTarget).hasClass('decimal')) {
                this.$el.trigger('decimal');
            } else {
                this.$el.trigger('digit', Number($(e.currentTarget).text()));
            }
        },

        _handleFunctionClick: function (e) {
            var func = $(e.currentTarget).attr('data-func');

            switch (func) {
                case 'clear':
                    this.$el.trigger('clear');
                    break;

                case 'inverse':
                    this.$el.trigger('invert');
                    break;

                default:
                    console.log('No handler set for function: ' + func);
                    break;
            }
        },

        _handleOperatorClick: function (e) {
            this.$el.trigger($(e.currentTarget).attr('data-operation'));
        },

        _handleEvaluateClick: function () {
            this.$el.trigger('evaluate')
        }
    });
})(jQuery, window._);