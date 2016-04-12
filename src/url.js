/****************************************************************************
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