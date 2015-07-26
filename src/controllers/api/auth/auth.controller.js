'use strict';

module.exports = function (router) {

    //Simulate logging in and out
    
    router.post('/login', function (req, res, next) {

        res.json(true);

    });
    
    router.get('/logout', function (req, res, next) {

        res.json(true);

    });
    
};