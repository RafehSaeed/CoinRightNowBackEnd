var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/menu.js').Item;
var Article= require('../models/article.js').Article;


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


//Returns all the article as JSON
router.get('/article',function(req,res) {
    
    Article.find(function (err,article) {
      if (err) return console.error(err);
      var articleArray = [];

      for(var i in article){
        //create json obect
        articleArray.push({title:article[i].getTitle(),commentbody:article[i].getCommentBody(), id:article[i]._id}); 

        }
      res.send(articleArray);
    });
});


//Returns a particulat article depending on the provided id
router.get('/article/:id',function(req,res) {
    
    Article.findById(req.params.id,function (err,article) {
        console.log(article);
      if (err) return console.error(err);

      res.send(article);
    });
});


//This is used to create articles given the tile and comment body of the article
router.post('/article',function(req,res) {
    console.log(req.body);
        var article1= new Article({title: req.body.title, commentbody: req.body.commentbody});
    article1.save(function(err,article) {
        if (err) return console.error(err,article);
        console.log("article" + article1.getTitle() + " has been created" + article1.getCommentBody());
    });
    res.send(article1);

});



//Returns yearly graph data as JSON
router.get('/coingraph/:id',function(req,res) {
	


    url = 'https://coinmarketcap.com/currencies/' +req.params.id + '/historical-data/?start=20170101&end=20371120';
    request(url, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);
            var graph = [];//stores the graph
            var count = 0;
            var graphset = {};

        	$('td').each(function(i, elem) {
        	count = count % 7;
        	//every time count reaches 0 create new object
        	if(count==0){

	        	graphset = {date:"" ,price: "" , volume: ""};
				graphset.date= $(this).text();
        	}

        	if(count==4){
        	 graphset.price= $(this).text();
        	}

        	if (count==5){
        	 graphset.volume= parseInt($(this).text().split(',').join(''));
        	}

        	if (count==6){
   
        	 graphset.marketcap= parseInt($(this).text().split(',').join(''));
        	 graph.push(graphset);
        	}

        	count++;
			});

    	res.send(graph);           
        }

    });
});

//Returns markets for the coin
router.get('/market/:id',function(req,res) {
    


    url = 'https://coinmarketcap.com/currencies/' +req.params.id + '/#markets';
    request(url, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);
            var graph = [];//stores the graph
            var count = 0;
            var graphset = {};

            $('td').each(function(i, elem) {
            count = count % 7;
            //every time count reaches 0 create new object
            if(count==0){

                graphset = {market:"" ,pair: "" , volume: "" , price:"", volumepercent:""};

            }

            if(count==1){

    
                graphset.market= $(this).text();
            }

            if(count==2){
             graphset.pair= $(this).text();
            }

            if(count==3){
             graphset.volume= $(this).text();
            }

            if(count==4){
             graphset.price= $(this).text();
            }

            if (count==5){
             graphset.volumepercent= $(this).text();
            }

            if (count==6){
   
           
             graph.push(graphset);
            }

            count++;
            });

        res.send(graph);           
        }

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