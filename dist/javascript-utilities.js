/****************************************************************************
	color.js,
	Functions to caluclate the brightness of a color
	Taken from http://codepen.io/lunelson/pen/jENxwB

****************************************************************************/

;(function (window, document, undefined) {
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

;(function (window, document, undefined) {
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

;(function (window, document, undefined) {
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

}(this, document));
;
/****************************************************************************
	url.js,

	Based on Adil Malik, http://stackoverflow.com/questions/1090948/change-url-parameters/10997390#10997390

****************************************************************************/

;(function (window, document, undefined) {
	"use strict";

	//Create namespace
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
			hashes = window.location.href.slice(i + 1).split('#')[0].split('&');
			for (i = 0; i < hashes.length; i = i + 1) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		}
		hashes = window.location.hash.slice(1).split('&');
		for (i = 0; i < hashes.length; i = i + 1) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	};

	/******************************************
	_updateUrl - Add or replace a parameter or hash tag (with value) in the given URL.
	@param String id the parameter or hash-tag
	@param String value the value of the id
	@param String url the URL
	@param Boolean isHashTag true id is a hash tag 
	@return String the changed URL
	*******************************************/
	function _updateUrl(id, value, url, isHashTag) {
		url = url || window.location.href;

		var theAnchor = null,
				tempArray = url.split("?"),
				baseURL = tempArray[0],
				additionalURL = tempArray[1],
				tmpAnchor,
				theParams = null,
				i;

		if (additionalURL) {
			tmpAnchor = additionalURL.split("#");
			theParams = tmpAnchor[0];
			theAnchor = tmpAnchor[1];
		}
		else {
			tmpAnchor = baseURL.split("#");
			theAnchor  = tmpAnchor[1];
			if (tmpAnchor[0])
			  baseURL = tmpAnchor[0];
		}

		var updateStr = isHashTag ? theAnchor : theParams,
				found = false,
				nextId;
    tempArray = updateStr ? updateStr.split("&") : [];
	  for (i=0; i < tempArray.length; i++) {
			nextId = tempArray[i].split('=')[0];
			if (nextId == id) {
				tempArray[i] = nextId+'='+value;
				found = true;
				break;
			}
		}
		if (!found)
			tempArray.push(id+'='+value);
		updateStr = tempArray.length > 1 ? tempArray.join('&') : tempArray[0];
		if (isHashTag)
			theAnchor = updateStr;
		else
			theParams = updateStr;

		return baseURL + (theParams ? '?' + theParams : '') + (theAnchor ? '#' + theAnchor : '');
	}

	/******************************************
	updateUrlParameter - Add or replace a parameter (with value) in the given URL.
	@param String url the URL
	@param String param the parameter
	@param String paramVal the value of the parameter
	@return String the changed URL
	*******************************************/
	nsUrl.updateUrlParameter = function(param, paramVal, url) {
		return _updateUrl(param, paramVal, url, false);
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
	updateUrlHash - Add or replace a parameter (with value) in the given URL.
	@param String hash the hash-id
	@param String hashVal the value of the hash-id
	@param String url the URL
	@return String the changed URL
	*******************************************/
	nsUrl.updateUrlHash = function(hash, hashVal, url) {
		return _updateUrl(hash, hashVal, url, true);
	};

	/******************************************
	updateUrlHashes - Same as `updateUrlHash` but with `hashes` as object a la `{"hash1":"newValue", "hash2":"newValue2"}`
	*******************************************/
	nsUrl.updateUrlHashes = function(hashes, url) {
		url = url || window.location.href;
		for (var hash in hashes)
			if ( hashes.hasOwnProperty(hash) )
			  url = nsUrl.updateUrlHash(hash, hashes[hash], url);
		return url;
	};

	
	
	/******************************************
	reloadPage
	Reload the page.
	Replace the original parameters and/or hashtags params and/or hashes
	*******************************************/
	nsUrl.reloadPage = function( params, hashes ){
		var newHref = nsUrl.updateUrlParameters( params, nsUrl.updateUrlHashes( hashes ) );
		if (window.location.href == newHref)
			window.location.reload( true );
		else
			window.location.href = newHref;
	};






	//******************************************



}(this, document));