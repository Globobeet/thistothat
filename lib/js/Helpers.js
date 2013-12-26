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

    toRational: function (input, precision) {
        var x = input;
        var e = +("1.0e-" + precision);
        var a = Math.floor(x);
        var h = [a, 1];
        var k = [1, 0];

        while (x-a > e*k[0]*k[0]) {
            x = 1/(x-a);
            a = Math.floor(x);

            h[2] = h[1];
            k[2] = k[1];

            h[1] = h[0];
            k[1] = k[0];

            h[0] = h[2] + a*h[1];
            k[0] = k[2] + a*k[1];
        }

        return { num: h[0], den: k[0] };
    },

    toWholeAndRational: function(input, precision) {
        var whole = Math.floor(input);
        var rational = this.toRational(input - whole, precision);
        return {
            whole: whole, num: rational.num, den: rational.den
        };
    }
};