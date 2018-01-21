var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Item = require('./models/menu.js').Item;
var Deal= require('./models/deal.js').Deal;
var CoinList= require('./models/coin.js').CoinList;
var passport = require('passport');
var request = require("request");


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


// BACKEND PROCESS NEEEDED

var setCoinList  = function() {
	// setTimeout(function() {
	request('https://api.coinmarketcap.com/v1/ticker/?limit=0', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    var coinlist1= new CoinList({coinList: body});
     coinlist1.save(function(err,coinlist) {
 		console.log('Coin List has been saved');
    });
});
	// },60000);	
};

setCoinList();

