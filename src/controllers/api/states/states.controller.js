'use strict';

var statesRepository = require('../../../lib/statesRepository');

module.exports = function (router) {

    router.get('/', function (req, res, next) {

        statesRepository.getStates(req, function (err, states) {

            if (err) return next(err);

            res.json(states);
        });

    });
    
};