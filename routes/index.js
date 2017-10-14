var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlAuth= require('../controllers/authentication');
var ctrlMenu = require('../controllers/menu');


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//Items
router.get('/items',ctrlMenu);
router.post('/items',ctrlMenu);

module.exports = router;