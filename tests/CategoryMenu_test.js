describe('The category menu should be able to', function() {
    var menu;

    beforeEach(function () {
        $('#fixture').remove();
        $('body').append('<section class="unit-category"><nav><ul></ul></nav></section>');

        menu = new CategoryMenu($('.unit-category'), {
            "foo": {
                label: "Foo"
            },
            "bar": {
                label: "Bar"
            }
        });
    });

    it('render it\'s items on init', function() {
        expect(menu.$el.find('li').length).toBe(2);
    });

    it('set an item to active, clearing the old if it exists', function () {
        menu.setActive('foo');
        expect(menu.$el.find('button[data-unit-type="foo"]').closest('li').hasClass('active')).toBe(true);

        menu.setActive('bar');
        expect(menu.$el.find('button[data-unit-type="foo"]').closest('li').hasClass('active')).toBe(false);
        expect(menu.$el.find('button[data-unit-type="bar"]').closest('li').hasClass('active')).toBe(true);
    });

    it('clear an active item', function () {
        menu.clearActive();
        expect(menu.$el.find('button[data-unit-type="foo"]').closest('li').hasClass('active')).toBe(false);
    });

    it('tell you which item is currently active', function () {
        menu.setActive('bar');
        expect(menu.getActive()).toBe('bar');
    });

    it('triggers an event on click', function () {
        spyOnEvent('.unit-category', 'click:item');
        menu.$el.find('li:first-child button').hammer().trigger('tap');
        expect('click:item').toHaveBeenTriggeredOnAndWith('.unit-category', 'foo');
    });
});