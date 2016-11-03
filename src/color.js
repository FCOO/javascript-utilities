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