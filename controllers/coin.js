var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Coin = require('../models/coin.js').CoinList;

//Returns the coins list in JSON format
router.get('/coinlist',function(req,res) {
	Coin.findById('1', function (err, coin) {
		res.send(coin.getCoinList());
	});
});

//get all version of differnt coins
router.get('/coinlistall',function(req,res) {
	Coin.find(function (err,coins) {
	  if (err) return console.error(err);

	  res.send(coins);
	});
});
module.exports= router;