const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request'); // "Request" library

// dev: load environment vars from file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// credentials
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
});




//Define the express configuration
module.exports = function () {



    //Create a new express instance
    var app = express();

    //configure body parser
    app.set('json spaces', 4);

    //Here we are configuring express to use body-parser as middle-ware.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join('./', 'build')));


    //add access control response
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            var today = new Date();
            today.setSeconds(today.getSeconds() + (data.body['expires_in']));

            //for testsof async/await in routes.js
            // today.setSeconds(today.getSeconds() + 10);


            spotifyApi['expireDateTime'] = today.getTime();
            console.log('expires in: ' + spotifyApi['expireDateTime']);



            spotifyApi.setAccessToken(data.body['access_token']);
            require('./routes')(app, path, spotifyApi);
        },
        function (err) {
            console.log('Something went wrong when retrieving an access token', err.message
            );
        });


    return app;
};