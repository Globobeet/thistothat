(function($){
    var UA, ios, msafari;

    UA = navigator.userAgent;
    ios = (UA.match(/(iPad|iPhone|iPod)/g)) ? true : false;
    msafari = (UA.match(/Safari/i) && !UA.match(/Chrome/i) && !UA.match(/CriOS/i)) ? true : false;

    $(document).ready(function() {
        if (!window.navigator.standalone && ios) {
            $('#install').css('opacity', 1);
            if(!msafari) { $('#install .message').html('You must be using Safari to install <strong>thistothat</strong>'); }
        } else {
            $('#install').remove();
        }
    });
})(jQuery);