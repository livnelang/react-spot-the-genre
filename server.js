const express = require('./config/express');
const app = express();

// create a http module from express
var server = require('http').createServer(app);
app.set('port', process.env.PORT || 5000);

// Start the server
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port + ' ..');
});