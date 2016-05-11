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