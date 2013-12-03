var app;

(function($){
    var UA = navigator.userAgent,
        ios = (UA.match(/(iPad|iPhone|iPod)/g)) ? true : false,
        msafari = (UA.match(/Safari/i) && !UA.match(/Chrome/i) && !UA.match(/CriOS/i)) ? true : false;

    $(document).ready(function() {
        if (!window.navigator.standalone && ios) {
            if(!msafari) { $('#install .message').html('You must be using Safari to install <strong>thistothat</strong>'); }
        } else {
            $('#install').remove();
        }

        $('body').bind({
            touchmove: function (e) {
                e.preventDefault();
            }
        });

        $('#install').remove();

        app = new App($('body')[0]);
        app.init();
    });
})(jQuery);