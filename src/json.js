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