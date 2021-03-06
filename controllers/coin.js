var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Coin = require('../models/coin.js').CoinList;
var GlobalData= require('../models/global.js').GlobalData;
var CurrencyList= require('../models/currencies.js').CurrencyList;
var helper = require('../helpers/helper.js');

//Returns the coins list in JSON format
router.get('/coinlist',function(req,res) {
	client.get('coinlist', function(err, result) {
		if(result){
			console.log('CoinList sent via Redis')
			res.send(JSON.parse(result));
		}else{
			Coin.findById('1', function (err, coin) {
			res.send(coin.getCoinList());
			});
		}
	});
});


//Returns the global data in JSON format
router.get('/globaldata',function(req,res) {
	client.get('globaldata', function(err, result) {
		if(result){
			console.log('GlobalData sent via Redis')
			res.send(JSON.parse(result));
		}else{
			Coin.findById('1', function (err, coin) {
			res.send(coin.getCoinList());
			});
		}
	});
});


//Returns the currency list in JSON format
router.get('/currencylist',function(req,res) {
		CurrencyList.findById('1', function (err, currency) {
			res.send(currency.getCurrencyList());
		});
});

//get all version of differnt coins
router.get('/coinlistall',function(req,res) {
	Coin.find(function (err,coins) {
	  if (err) return console.error(err);
	  res.send(coins);
	});
});
//Returns the top performing coin in the last 24 hours
router.get('/gettopperformers',function(req,res) {
	Coin.findById('1', function (err, coin) {
		var topworstperformers = [];
		topworstperformers.push({topcoin: coin.getBestPerformingCoin(),worstcoin: coin.getWorstPerformingCoin()});
		res.send(topworstperformers);
	});
});
module.exports= router;