/****************************************************************************
	color.js,
	Functions to caluclate the brightness of a color
	Taken from http://codepen.io/lunelson/pen/jENxwB

****************************************************************************/

;(function ($, window, document, undefined) {
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









	/******************************************
	Initialize/ready
	*******************************************/
	$(function() { //"$( function() { ... });" is short for "$(document).ready( function(){...});"


	}); //End of initialize/ready
	//******************************************



}(jQuery, this, document));;/****************************************************************************
	json.js,
****************************************************************************/

;(function ($, window, document, undefined) {
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


}(jQuery, this, document));;/****************************************************************************
	math.js,

****************************************************************************/

;(function ($, window, document, undefined) {
	"use strict";

	var nsMath = window;

	/*******************************************
	significant - return n rounded to significant sf
	*******************************************/
	nsMath.significant =	function significant(n, sf) {
		sf = sf - Math.floor(Math.log(n) / Math.LN10) - 1;
		sf = Math.pow(10, sf);
		n = Math.round(n * sf);
		n = n / sf;
		return n;
	};

	/*******************************************
	precision
	*******************************************/
	nsMath.precision =	function precision(n, dp) {
		dp = Math.pow(10, dp);
		n = n * dp;
		n = Math.round(n);
		n = n / dp;
		return n;
	};

	/*******************************************
	nearest
	*******************************************/
	nsMath.nearest =	function nearest(n, v) {
		v = v ? v : 1;
		n = n / v;
		n = Math.round(n) * v;
		return n;
	};

	/*******************************************
	roundDownTo
	*******************************************/
	nsMath.roundDownTo =	function roundDownTo(n, v) {
		v = v ? v : 1;
		n = n / v;
		n = Math.floor(n) * v;
		return n;
	};

	/*******************************************
	roundToRange
	*******************************************/
	nsMath.roundToRange =	function roundToRange(v, min, max) {
		return Math.max( Math.min(v, max), min);
	};

	/*******************************************
	toDecimal
	Convert a integer value v to a decimal
	Eq	toDecimal(89)		= 0.89
			toDecimal(9)		= 0.9
			toDecimal(1234)	= 0.1234
	*******************************************/
	nsMath.toDecimal =	function toDecimal(v) {
		var l = v.toString().length;
		return v / Math.pow(10, l);
	};

}(jQuery, this, document));;/****************************************************************************
	url.js,
****************************************************************************/

;(function ($, window, document, undefined) {
	"use strict";

	//Create fcoo-namespace
	var nsUrl = window;


	/******************************************
	getUrlParameters - Get all parameters out of the URL.
	@return Array List of URL parameters key-value indexed
	******************************************/
	nsUrl.getUrlParameters = function() {
		var vars = [],
				hash,
				hashes,
				i;
		i = window.location.href.indexOf('?');
		if (i !== -1) {
			hashes = window.location.href.slice(i + 1).split('&');
			for (i = 0; i < hashes.length; i = i + 1) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		}
		i = window.location.href.indexOf('#');
		if (i !== -1) {
			hashes = window.location.href.slice(i + 1).split('&');
			for (i = 0; i < hashes.length; i = i + 1) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		}
		return vars;
	};

	/******************************************
	updateUrlParameter - Add or replace a parameter (with value) in the given URL.
	By Adil Malik, http://stackoverflow.com/questions/1090948/change-url-parameters/10997390#10997390
	@param String url the URL
	@param String param the parameter
	@param String paramVal the value of the parameter
	@return String the changed URL
	*******************************************/
	nsUrl.updateUrlParameter = function(param, paramVal, url) {
		url = url || window.location.href;
		var theAnchor = null,
				newAdditionalURL = "",
				tempArray = url.split("?"),
				baseURL = tempArray[0],
				additionalURL = tempArray[1],
				temp = "",
				tmpAnchor,
				theParams,
				i,
				rowsText;

		if (additionalURL) {
			tmpAnchor = additionalURL.split("#");
			theParams = tmpAnchor[0];
			theAnchor = tmpAnchor[1];
			if (theAnchor) {
				additionalURL = theParams;
			}

	    tempArray = additionalURL.split("&");

		  for (i = 0; i < tempArray.length; i = i + 1) {
				if (tempArray[i].split('=')[0] !== param) {
					newAdditionalURL += temp + tempArray[i];
					temp = "&";
				}
			}
		}
		else {
			tmpAnchor = baseURL.split("#");
			theParams = tmpAnchor[0];
			theAnchor  = tmpAnchor[1];

			if (theParams) {
				baseURL = theParams;
			}
		}

		if (theAnchor) {
			paramVal += "#" + theAnchor;
		}

		rowsText = temp + param + "=" + paramVal;
		return baseURL + "?" + newAdditionalURL + rowsText;
	};

	/******************************************
	updateUrlParameters - Same as `updateUrlParameter` but with `params` as object a la `{"param1":"newValue", "param2":"newValue2"}`
	*******************************************/
	nsUrl.updateUrlParameters = function(params, url) {
		url = url || window.location.href;
		for (var param in params)
			if ( params.hasOwnProperty(param) )
			  url = nsUrl.updateUrlParameter(param, params[param], url);
		return url;
	};

	/******************************************
	reloadPage
	Reload the page.
	Replace the original parametres with newParm = JSON-object
	*******************************************/
	nsUrl.reloadPage = function( param, paramVal ){
		var newHref = nsUrl.updateUrlParameter( param, paramVal );
		if (window.location.href == newHref)
			window.location.reload( true );
		else
			window.location.href = newHref;
	};






	//******************************************



}(jQuery, this, document));