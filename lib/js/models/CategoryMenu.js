var CategoryMenu;

(function($, _){
    CategoryMenu = function(el, items) {
        this.el = el;
        this.$el = $(el);
        this.items = items;
        this.init();
    };

    _.extend(CategoryMenu.prototype, {
        init: function() {
            _.bindAll(this, '_handleCategoryClick');

            var self = this;

            self.ui = {
                nav: self.$el.find('nav'),
                list: self.$el.find('ul')
            };

            self._renderItems();

            self.ui.nav.find('button').hammer().on({
                tap: self._handleCategoryClick
            });
        },

        _renderItems: function () {
            var self = this;

            _.each(_.keys(self.items), function (key) {
                self.ui.list.append('<li><button type="button" data-unit-type="' + key + '">' + self.items[key].label + '</button></li>');
            });
        },

        clearActive: function() {
            this.$el.find('.active').removeClass('active');
        },

        setActive: function (item) {
            this.clearActive();
            this.$el.find('button[data-unit-type="' + item + '"]').closest('li').addClass('active');
        },

        getActive: function() {
            return this.ui.nav.find('.active button').attr('data-unit-type');
        },

        _handleCategoryClick: function(e){
            this.$el.trigger('click:item', $(e.currentTarget).attr('data-unit-type'));
        }
    });
})(jQuery, window._);