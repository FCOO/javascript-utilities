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

    /********************************************
    rgbHex
    Convert RGB color to HEX
    From https://github.com/sindresorhus/rgb-hex
    ********************************************/
    nsColor.rgbHex = function(red, green, blue, alpha){
        var isPercent = (red + (alpha || '')).toString().includes('%');

        if (typeof red === 'string') {
            var res = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
            red = res[0];
            green = res[1];
            blue = res[2];
            alpha = res[3];
        }
        else
            if (alpha !== undefined) {
                alpha = parseFloat(alpha);
            }

        if (typeof red !== 'number' ||
            typeof green !== 'number' ||
            typeof blue !== 'number' ||
            red > 255 ||
            green > 255 ||
            blue > 255) {
                throw new TypeError('Expected three numbers below 256');
        }

        if (typeof alpha === 'number') {
            if (!isPercent && alpha >= 0 && alpha <= 1) {
                alpha = Math.round(255 * alpha);
            }
            else
                if (isPercent && alpha >= 0 && alpha <= 100) {
                    alpha = Math.round(255 * alpha / 100);
                }
                else {
                    throw new TypeError('Expected alpha value (${alpha}) as a fraction or percentage');
                }
            alpha = (alpha | 1 << 8).toString(16).slice(1);
        }
        else {
            alpha = '';
        }

        return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
    };

    /********************************************
    hexRgb
    Convert HEX color to RGB
    From https://github.com/sindresorhus/hex-rgb
    ********************************************/
    var hexChars = 'a-f\\d',
        match3or4Hex = '#?[' + hexChars + ']{3}[' + hexChars + ']?',
        match6or8Hex = '#?[' + hexChars + ']{6}([' + hexChars + ']{2})?',
        nonHexChars = new RegExp('[^#' + hexChars + ']', 'gi'),
        validHexSize = new RegExp('^' + match3or4Hex + '$|^' + match6or8Hex + '$', 'i');

    nsColor.hexRgb = function(hex, options) {
        options = options || {};
        if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
            throw new TypeError('Expected a valid hex string');
        }

        hex = hex.replace(/^#/, '');
        var alpha = 255;

        if (hex.length === 8) {
            alpha = parseInt(hex.slice(6, 8), 16) / 255;
            hex = hex.substring(0, 6);
        }

        if (hex.length === 4) {
            alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
            hex = hex.substring(0, 3);
        }

        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        var num = parseInt(hex, 16),
            red = num >> 16,
            green = (num >> 8) & 255,
            blue = num & 255;

        return options.format === 'array' ? [red, green, blue, alpha] : { red: red, green: green, blue: blue, alpha: alpha };
    };

    /********************************************
    hexSetAlpha
    Set the alpha-value in a hex-color
    ********************************************/
    nsColor.hexSetAlpha = function(hex, alpha){
        var rgba = nsColor.hexRgb(hex, {format: 'array'});
        rgba[3] = alpha;
        return nsColor.rgbHex.apply(this, rgba);
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