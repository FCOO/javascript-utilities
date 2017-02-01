/****************************************************************************
    color.js,
    Functions to caluclate the brightness of a color
    Taken from http://codepen.io/lunelson/pen/jENxwB

****************************************************************************/

(function (window/*, document, undefined*/) {
    "use strict";

    //Create fcoo-namespace
    var nsColor = window;


    function lin2log(n) {
        if (n <= 0.0031308)
            return n * 12.92;
        else
            return 1.055 * Math.pow(n,1/2.4) - 0.055;
    }

    function log2lin(n) {
        if (n <= 0.04045)
            return n / 12.92;
        else
            return Math.pow(((n + 0.055)/1.055),2.4);
    }

    /********************************************
    brightness
    ********************************************/
    nsColor.brightness = function brightness(r, g, b) {
        r = log2lin(r/255);
        g = log2lin(g/255);
        b = log2lin(b/255);
        return lin2log(0.2126 * r + 0.7152 * g + 0.0722 * b) * 100;
    };

    /********************************************
    colorContrastHEX
    ********************************************/
    nsColor.colorContrastHEX = function colorContrastHEX( color ) {
        if (color.length === 3)
            color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
        var rgb = [];
        for (var i = 0; i <= 2; i++)
            rgb[i] = parseInt(color.substr(1+i*2, 2), 16);
        return nsColor.colorContrastRGB(rgb[0], rgb[1], rgb[2]);
    };

    /********************************************
    colorContrastRGB
    ********************************************/
    nsColor.colorContrastRGB = function colorContrastRGB(r, g, b) {
        var colorBrightness = nsColor.brightness(r, g, b),
                whiteBrightness = nsColor.brightness(255, 255, 255),
                blackBrightness = nsColor.brightness(0, 0, 0);
        return Math.abs(colorBrightness - whiteBrightness) > Math.abs(colorBrightness - blackBrightness) ? '#ffffff' : '#000000';
    };



}(this, document));
;
/****************************************************************************
    json.js,
****************************************************************************/

(function (window/*, document, undefined*/) {
    "use strict";

    //Create fcoo-namespace
    var nsJSON = window;

    /******************************************
    serializeJSON
    Converts a json-object a la {id1:'value1', id2:'value2'}
    to [ { name: "id1", value: "value1" }, { name: "id2", value: "value2" } ]
    *******************************************/
    nsJSON.serializeJSON = function( jsonObj ){
        var result = [];
        for (var id in jsonObj)
            if (jsonObj.hasOwnProperty(id))
                result.push( {name: id, value: jsonObj[id] });
        return result;
    };


}(this, document));
;
/****************************************************************************
    math.js,

****************************************************************************/

(function (window/*, document, undefined*/) {
    "use strict";

    var nsMath = window;

    /*******************************************
    significant - return n rounded to significant sf
    *******************************************/
    nsMath.significant = function significant(n, sf) {
        sf = sf - Math.floor(Math.log(n) / Math.LN10) - 1;
        sf = Math.pow(10, sf);
        n = Math.round(n * sf);
        n = n / sf;
        return n;
    };

    /*******************************************
    precision
    *******************************************/
    nsMath.precision = function precision(n, dp) {
        dp = Math.pow(10, dp);
        n = n * dp;
        n = Math.round(n);
        n = n / dp;
        return n;
    };

    /*******************************************
    nearest
    *******************************************/
    nsMath.nearest = function nearest(n, v) {
        v = v ? v : 1;
        n = n / v;
        n = Math.round(n) * v;
        return n;
    };

    /*******************************************
    roundDownTo
    *******************************************/
    nsMath.roundDownTo = function roundDownTo(n, v) {
        v = v ? v : 1;
        n = n / v;
        n = Math.floor(n) * v;
        return n;
    };

    /*******************************************
    roundToRange
    *******************************************/
    nsMath.roundToRange = function roundToRange(v, min, max) {
        return Math.max( Math.min(v, max), min);
    };

    /*******************************************
    toDecimal
    Convert a integer value v to a decimal
    Eq    toDecimal(89)        = 0.89
            toDecimal(9)        = 0.9
            toDecimal(1234)    = 0.1234
    *******************************************/
    nsMath.toDecimal = function toDecimal(v) {
        var l = v.toString().length;
        return v / Math.pow(10, l);
    };

}(this, document));