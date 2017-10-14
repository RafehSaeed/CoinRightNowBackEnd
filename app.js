var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Item = require('./models/menu.js').Item;
var Deal= require('./models/deal.js').Deal;
var passport = require('passport');

mongoose.connect('mongodb://localhost/test', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connection activated...');
});

require('./config/passport');

var routesApi = require('./routes/index');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({type: 'application/json'}));
app.use('/', routesApi);


var port = 5000; 


app.listen(port,function(err) {
	console.log('Running server on port '+ port);
});

