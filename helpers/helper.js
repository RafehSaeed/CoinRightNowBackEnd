(function(){

var redis = require('redis');

function addCoinListToReddis(body){

	client.set('coinlist', body, redis.print);	
}

exports.addCoinListToReddis = addCoinListToReddis;
}());