var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/menu.js').Item;
var Deal= require('../models/deal.js').Deal;


//Returns all the Menu Itemw as JSON
router.get('/items',function(req,res) {
	
	Item.find(function (err,items) {
	  if (err) return console.error(err);
	  var itemArray = [];

	  for(var i in items){
	  	//create json obect
	  	itemArray.push({name:items[i].name,description:items[i].description,price:items[i].price,
	  	expensive:items[i].checkPrice()}); 

	  	}
	  res.send(itemArray);
	});
});

//Creates new items provided by the User

router.post('/items',function(req,res) {
	var item1= new Item({name: req.body.name,description: req.body.description,price: req.body.price});
	item1.save(function(err,item) {
		if (err) return console.error(err,item);
		console.log("item" + item1.getName() + " has been created");
	});
	res.send(item1);
});

module.exports= router;