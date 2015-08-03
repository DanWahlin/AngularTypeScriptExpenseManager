'use strict';

var fs      = require('fs'),
    path    = require('path'),
    express = require('express');

var routes = function () {

    var startDir = null,

    //Called once during initial server startup
    load = function(app, folderName) {

        //folder that acts as the container for convention-based routes (for example "controllers")
        if (!startDir) startDir = path.basename(folderName);
        fs.readdirSync(folderName).forEach(function(file) {

            var fullName = path.join(folderName, file);
            var stat = fs.lstatSync(fullName);

            if (stat.isDirectory()) {
                //Recursively walk-through folders
                load(app, fullName);
            }
            else if (file.toLowerCase().indexOf('.js')) {
                //Grab path to JavaScript file and use it to construct the route
                var dirs = path.dirname(fullName).split(path.sep);
                
                //Filter out all folder paths up to the startDir (and including the startDir) originally passed in.
                //For example, if startDir is "controllers" then we find it and remove everything to it
                //That means that mybasepath/subfolder/controllers/api/auth becomes /api/auth
                //This allows for server.js to be started from different paths
                var startDirIndex = dirs.indexOf(startDir),
                    startDirLastIndex = dirs.lastIndexOf(startDir);
                //Ensure startDir only exists once in the overall path of directories. If it's found more than once we
                //can't make this work (as is) so throw an error
                if (startDirIndex === startDirLastIndex) {
                    dirs.splice(0, startDirIndex + 1);
                }
                else {
                    throw new Error(startDir + ' directory may only appear once in the directory path.')
                }

                var router = express.Router();
                //Generate the base route used by the Express router
                var baseRoute = '/' + dirs.join('/');
                if (app.settings.env === 'development') {
                    console.log('Created route: ' + baseRoute + ' for ' + fullName + '\n');
                }

                //Load the JavaScript file ("controller") and pass the router to it
                require(fullName)(router);
                //Associate the route with the router
                app.use(baseRoute, router);
            }
        });

    };

    return {
        load: load
    };

}();

module.exports = routes;






