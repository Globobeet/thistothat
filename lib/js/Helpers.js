var $$ = {
    trimFromStart: function (val, i) {
        var str = _(val).toString();
        return str.substring(0, i);
    },

    trimFromEnd: function (val, i) {
        var str = _(val).toString(),
            start = str.length - i;

        return str.substring(start, (start + i));
    }
};