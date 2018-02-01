var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var R = require('ramda');

// Stores the list of all coins gotten from marketcap  API
var coinSchema = new Schema({
	_id: {type: String},
	coinList:{
		type: Object
	}
});

//returns all of the coinList
coinSchema.methods.getCoinList = function  () {

    return this.coinList;
};

//returns coin with the best 24 hour change
coinSchema.methods.getBestPerformingCoin = function  () {
	var parseAsInt = function(n){
	 	if(n.percent_change_24h == null)
	 		{n.percent_change_24h=0;}
	 	n.percent_change_24h = parseFloat(n.percent_change_24h);
	};

	var sortByPercent = R.sortBy(R.compose( R.prop('percent_change_24h')));

	var filterdlist =	R.project(['id','name','percent_change_24h'], JSON.parse(this.coinList));
	filterdlist.map(parseAsInt);
	var topcoin = sortByPercent(filterdlist);
	return topcoin[topcoin.length-1];
};


var CoinList = mongoose.model('CoinList',coinSchema);

module.exports = {
  CoinList: CoinList
};
