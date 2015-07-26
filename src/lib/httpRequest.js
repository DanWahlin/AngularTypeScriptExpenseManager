"use strict";

var request = require('request');

var httpRequest = function() {
	
	var get = function(url, callback) {
		request(url, function (err, response, body) {
			if (err && response.statusCode !== 200) {
				return callback(err, null);
			}
		    callback(null, JSON.parse(body));
		});
	};
    
    return {
        get: get
    };
}();

module.exports = httpRequest;