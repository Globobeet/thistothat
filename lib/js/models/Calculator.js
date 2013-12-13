var Calculator;

(function($, _){
    'use strict';

    Calculator = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(Calculator.prototype, {
        init: function() {
            _.bindAll(this, '_handleEvaluateClick', '_handleDigitClick', '_handleFunctionClick', '_handleOperatorClick');

            var self = this;

            self.$el.find('.digit').hammer().on({
                touch: self._handleDigitClick
            });

            self.$el.find('.function').hammer().on({
                touch: self._handleFunctionClick
            });

            self.$el.find('.operator').hammer().on({
                touch: self._handleOperatorClick
            });

            self.$el.find('.evaluate').hammer().on({
                touch: self._handleEvaluateClick
            });
        },

        removeHighlight: function () {
            this.$el.find('.highlighted').removeClass('highlighted');
        },

        evaluate: function () {
            this.$el.trigger('evaluate');
        },

        _handleEvaluateClick: function () {
            this.removeHighlight();
            this.evaluate();
        },

        _handleDigitClick: function (e) {
            this.removeHighlight();

            if ($(e.currentTarget).hasClass('decimal')) {
                this.$el.trigger('decimal');
            } else {
                this.$el.trigger('digit', Number($(e.currentTarget).text()));
            }
        },

        _handleFunctionClick: function (e) {
            var func = $(e.currentTarget).attr('data-func');

            switch (func) {
                case 'percent':
                    this.$el.trigger('percent');
                    break;

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
            if (this.$el.find('.highlighted').length > 0) {
                this.$el.trigger('new:operation');
                this.removeHighlight();
            }

            $(e.currentTarget).addClass('highlighted');
            this.$el.trigger($(e.currentTarget).attr('data-operation'));
        }
    });
})(jQuery, window._);