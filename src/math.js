/****************************************************************************
    math.js,

****************************************************************************/

(function (window/*, document, undefined*/) {
    "use strict";

    var nsMath = window;

    /*******************************************
    significant - return n rounded to significant sf
    *******************************************/
    nsMath.significant =    function significant(n, sf) {
        sf = sf - Math.floor(Math.log(n) / Math.LN10) - 1;
        sf = Math.pow(10, sf);
        n = Math.round(n * sf);
        n = n / sf;
        return n;
    };

    /*******************************************
    precision
    *******************************************/
    nsMath.precision =    function precision(n, dp) {
        dp = Math.pow(10, dp);
        n = n * dp;
        n = Math.round(n);
        n = n / dp;
        return n;
    };

    /*******************************************
    nearest
    *******************************************/
    nsMath.nearest =    function nearest(n, v) {
        v = v ? v : 1;
        n = n / v;
        n = Math.round(n) * v;
        return n;
    };

    /*******************************************
    roundDownTo
    *******************************************/
    nsMath.roundDownTo =    function roundDownTo(n, v) {
        v = v ? v : 1;
        n = n / v;
        n = Math.floor(n) * v;
        return n;
    };

    /*******************************************
    roundToRange
    *******************************************/
    nsMath.roundToRange =    function roundToRange(v, min, max) {
        return Math.max( Math.min(v, max), min);
    };

    /*******************************************
    toDecimal
    Convert a integer value v to a decimal
    Eq    toDecimal(89)        = 0.89
            toDecimal(9)        = 0.9
            toDecimal(1234)    = 0.1234
    *******************************************/
    nsMath.toDecimal =    function toDecimal(v) {
        var l = v.toString().length;
        return v / Math.pow(10, l);
    };

}(this, document));