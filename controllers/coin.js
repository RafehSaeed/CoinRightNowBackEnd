var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Coin = require('../models/coin.js').CoinList;



//Returns the coins list in JSON format
router.get('/coinlist',function(req,res) {
	Coin.findById('5a64c025f69b9f048cf58cdd', function (err, coin) {
		res.send(coin.getCoinList());
	});
});

module.exports= router;