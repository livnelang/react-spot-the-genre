var request = require('request'); // "Request" library
var spotifyCache = {
    total: 0,
    usedOffset: []
}
var templateUrl = 'https://api.spotify.com/v1/search?';


var randomRequestOptions = {
    url: '',
    headers: {
        'Authorization': ''
    }
};

module.exports = async function (app, path, spotifyApi) {



    // C.R.U.D operations
    app.get('/*', fetchIndex);
    app.post('/getRandomArtist', getRandomArtist);



    function fetchIndex(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }

    async function getRandomArtist(req, res) {
        //verify access token
        await checkAccessToken(spotifyApi);
        await setRandomArtistTotal();



        var currentNumber;
        while (typeof currentNumber !== 'number') {
            var rand = Math.floor(Math.random() * spotifyCache.total);
            if (!spotifyCache.usedOffset.includes(rand)) {
                spotifyCache.usedOffset.push(rand);
                currentNumber = rand;
            }
        }
        // console.log('selectednum: ' + currentNumber);


        var limitOffsetParams = "&limit=30";
        var offsetLimitRequestOptions = Object.assign({}, randomRequestOptions);

        offsetLimitRequestOptions.url = offsetLimitRequestOptions.url.concat(limitOffsetParams);


        request.get(offsetLimitRequestOptions, function (error, response, body) {
            // console.log(spotifyApi.getAccessToken());
            // console.log(offsetLimitRequestOptions.url);
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                if (data.artists) {
                    var imagedArtists = getImagedArtists(data.artists.items);
                    res.json(imagedArtists);
                }
                else {
                    console.log('artsits issue: ' + data)
                }
            } else {
                res.json(response);
            }
        })

    }

    function setRandomArtistTotal() {

        return new Promise(function (resolve, reject) {

            setRandomTotalQueryString();

            randomRequestOptions.headers['Authorization'] = 'Bearer ' + spotifyApi.getAccessToken();
            request.get(randomRequestOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var data = JSON.parse(body);
                    spotifyCache.total = data.artists.total - 1;
                    console.log('total for random year: ' + spotifyCache.total);
                    return resolve();
                } else {
                    console.log(error);
                    return reject();
                }
            })

        });
    }

};




function setRandomTotalQueryString() {
    let queryString = "?q=year%3A";
    var year = Math.floor(Math.random() * (2001 - 1980) + 1980);
    // let year = 2001;

    console.log('year: ' + year);
    randomRequestOptions.url = templateUrl.replace("?", queryString.concat(year).concat("&type=artist&market=US"));
}




function getImagedArtists(artists) {
    arrayShuffle(artists);

    return artists;
}

function arrayShuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    a.sort(function (item) {
        return item.images.length > 0;
    })

    return a;
}



function checkAccessToken(spotifyApi) {

    return new Promise(function (resolve, reject) {


        //verify access token
        if (new Date().getTime() < spotifyApi['expireDateTime']) {
            return resolve();
        }

        console.log('at refresh token function!, refresh is needed');
        // Retrieve an access token.
        spotifyApi.clientCredentialsGrant().then(
            function (data) {
                var today = new Date();
                today.setSeconds(today.getSeconds() + (data.body['expires_in']));

                spotifyApi['expireDateTime'] = today.getTime();
                // console.log('expires in: ' + spotifyApi['expireDateTime']);

                spotifyApi.setAccessToken(data.body['access_token']);
                return resolve();
            },
            function (err) {
                console.log('Something went wrong when retrieving an access token', err.message
                );
                return resolve();
            });

    })
}