var CategoryMenu;

(function($, _){
    CategoryMenu = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(CategoryMenu.prototype, {
        init: function() {
            _.bindAll(this, 'handleMenuClick', 'handleCategoryClick');

            var self = this;

            self.ui = {
                toggle: self.$el.find('.toggle'),
                nav: self.$el.find('nav')
            };

            self.ui.toggle.bind({
                click: self.handleMenuClick,
                touchstart: self.handleMenuClick
            });

            self.ui.nav.find('a').bind({
                click: self.handleCategoryClick,
                touchstart: self.handleCategoryClick
            });
        },

        toggleOpen: function(isOpen) {
            if(_.isUndefined(isOpen)) { isOpen = !this.isOpen(); }
            this.$el.toggleClass('open', isOpen);
        },

        isOpen: function() {
            return this.$el.hasClass('open');
        },

        clearActive: function() {
            this.$el.find('.active').removeClass('active');
        },

        setActive: function(elem){
            this.clearActive();
            $(elem).closest('li').addClass('active');
        },

        getActive: function() {
            return this.ui.nav.find('.active a').text().toLowerCase().replace(/ /g, '-');
        },

        handleMenuClick: function(e){
            if(e){ e.preventDefault(); }
            this.toggleOpen();
        },

        handleCategoryClick: function(e){
            if(e){ e.preventDefault(); }
            this.setActive(e.currentTarget);
            this.toggleOpen(false);
            this.$el.trigger('change:active', this.getActive());
        }
    });
})(jQuery, window._);