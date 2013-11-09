var App;

(function($, _){
    App = function(el) {
        this.el = el;
        this.$el = $(el);
    };

    _.extend(App.prototype, {
        init: function() {
            _.bindAll(this, 'handleToggleClick', 'handleSwipeLeft', 'handleSwipeRight', 'handleChangeActive');

            var self = this;

            self.ui = {
                toggle: self.$el.find('.toggle'),
                menu: self.$el.find('.unit-category'),
                stage: self.$el.find('.stage')
            };

            self.menu = this.getMenu();

            self.ui.toggle.hammer().on({
                tap: self.handleToggleClick
            });

            self.$el.hammer().on({
                dragleft: self.handleSwipeLeft,
                dragright: self.handleSwipeRight
            });

            self.menu.$el.bind({
                'change:active': self.handleChangeActive
            })
        },

        getMenu: function () {
            return new CategoryMenu(this.ui.menu[0]);
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
        }
    });
})(jQuery, window._);