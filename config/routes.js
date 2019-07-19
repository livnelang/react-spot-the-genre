var request = require('request'); // "Request" library
var spotifyCache = {
    total: 0,
    usedOffset: []
}

var randomRequestOptions = {
    url: 'https://api.spotify.com/v1/search?',
    headers: {
        'Authorization': ''
    }
};

module.exports = function (app, path, spotifyApi) {
    setRandomArtistTotal();


    // C.R.U.D operations
    // app.get('/*', fetchIndex);
    app.get('/getRandomArtist', getRandomArtist);



    // function fetchIndex(req, res) {
    //     res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // }

    function getRandomArtist(req, res) {
        var currentNumber;
        while (typeof currentNumber !== 'number') {
            var rand = Math.floor(Math.random() * spotifyCache.total);
            if (!spotifyCache.usedOffset.includes(rand)) {
                spotifyCache.usedOffset.push(rand);
                currentNumber = rand;
            }
        }
        console.log('selectednum: ' + currentNumber);


        var limitOffsetParams = "&limit=1&offset=" + currentNumber;
        var offsetLimitRequestOptions = Object.assign({}, randomRequestOptions); 

        offsetLimitRequestOptions.url = offsetLimitRequestOptions.url.concat(limitOffsetParams);


        request.get(offsetLimitRequestOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                // console.log(data)
                res.json(data.artists);
            } else {
                res.json(response);
            }
        })

    }

    function setRandomArtistTotal() {
        setRandomTotalQueryString();

        randomRequestOptions.headers['Authorization'] = 'Bearer ' + spotifyApi.getAccessToken();
        request.get(randomRequestOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                spotifyCache.total = data.artists.total -1;
                console.log('total for random year: ' + spotifyCache.total);
            } else {
                console.log(error);
            }
        })
    }

};




function setRandomTotalQueryString() {
    var queryString = "?q=year%3A";
    var year = Math.floor(Math.random() * (2020 - 1950) + 1950) ;
    console.log('year: ' + year);
    randomRequestOptions.url = randomRequestOptions.url.replace("?", queryString.concat(year).concat("&type=artist&market=US"));
}