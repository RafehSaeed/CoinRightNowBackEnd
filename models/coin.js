var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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


var CoinList = mongoose.model('CoinList',coinSchema);

module.exports = {
  CoinList: CoinList
};
