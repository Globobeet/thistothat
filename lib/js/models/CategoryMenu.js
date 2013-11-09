var CategoryMenu;

(function($, _){
    CategoryMenu = function(el) {
        this.el = el;
        this.$el = $(el);
        this.init();
    };

    _.extend(CategoryMenu.prototype, {
        init: function() {
            _.bindAll(this, 'handleCategoryClick');

            var self = this;

            self.ui = {
                nav: self.$el.find('nav')
            };

            self.ui.nav.find('button').hammer().on({
                tap: self.handleCategoryClick
            });
        },

        clearActive: function() {
            this.$el.find('.active').removeClass('active');
        },

        setActive: function(elem){
            this.clearActive();
            $(elem).closest('li').addClass('active');
        },

        getActive: function() {
            return this.ui.nav.find('.active button').text().toLowerCase().replace(/ /g, '-');
        },

        handleCategoryClick: function(e){
            this.setActive(e.currentTarget);
            this.$el.trigger('change:active', this.getActive());
        }
    });
})(jQuery, window._);