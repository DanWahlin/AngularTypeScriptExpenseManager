"use strict";

var httpRequest = require('./httpRequest');

var statesRepository = function() {

    var states = null;
    
    var getStates = function(req, callback) {        
        if (states) {
			return callback(null, states);
		} else {
			var host = req.headers.host;
			httpRequest.get('http://' + host + '/states.json', function(err, statesData) {
				states = statesData;
				callback(err, states);
			});
		}
    };
    
    return {
        getStates: getStates
    };
}();

module.exports = statesRepository;
