var Calculator;

(function($, _){
    Calculator = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(Calculator.prototype, {
        init: function() {
            _.bindAll(this, 'handleDigitClick', 'handleFunctionClick', 'handleOperatorClick', 'handleEvaluateClick');

            var self = this;

            self.$el.find('.digit').hammer().on({
                tap: self.handleDigitClick
            });

            self.$el.find('.function').hammer().on({
                tap: self.handleFunctionClick
            });

            self.$el.find('.operator').hammer().on({
                tap: self.handleOperatorClick
            });

            self.$el.find('.evaluate').hammer().on({
                tap: self.handleEvaluateClick
            });
        },

        handleDigitClick: function (e) {
            if ($(e.currentTarget).hasClass('decimal')) {
                this.$el.trigger('decimal');
            } else {
                this.$el.trigger('digit', Number($(e.currentTarget).text()));
            }
        },

        handleFunctionClick: function (e) {
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

        handleOperatorClick: function (e) {
            this.$el.trigger($(e.currentTarget).attr('data-operation'));
        },

        handleEvaluateClick: function () {
            this.$el.trigger('evaluate')
        }
    });
})(jQuery, window._);