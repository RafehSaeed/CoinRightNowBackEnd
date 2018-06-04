(function(){

var redis = require('redis');

// Adds Coins List to Reddis Database
function addCoinListToReddis(body){
	client.set('coinlist', body, redis.print);	
}

exports.addCoinListToReddis = addCoinListToReddis;
}());