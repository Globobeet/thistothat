var $$ = {
    trimFromStart: function (val, i) {
        var str = _(val).toString();
        return str.substring(0, i);
    },

    trimFromEnd: function (val, i) {
        var str = _(val).toString(),
            start = str.length - i;

        return str.substring(start, (start + i));
    },

    roundDecimal: function (number, places) {
        var rounded = +(
            Math.round(
                +(number + "e+" + places)
            ) + ("e-" + places)
         );

        return _.isNaN(rounded) ? Math.round(number) : rounded;
    },

    toRational: function (input, epsilon) {
        var x = input;
        var a = Math.floor(x);
        var h = [a, 1];
        var k = [1, 0];

        while (x-a > epsilon*k[0]*k[0]) {
            x = 1/(x-a);
            a = Math.floor(x);

            h[2] = h[1];
            k[2] = k[1];

            h[1] = h[0];
            k[1] = k[0];

            h[0] = h[2] + a*h[1];
            k[0] = k[2] + a*k[1];
        }

        return h[0] + "/" + k[0];
    }
};