var express = require('express');
var router = express.Router();
var session = require('express-session');

// Intermediary route, captures all.
router.get('/*', function(req, res, next) {
  req.viewargs = {};
  if(req.session.username){     // There is a login
    req.viewargs.loggedIn = true;
    req.viewargs.username = req.session.username
  } else{                   // Anonymous session
    req.viewargs.loggedIn = false;
    req.viewargs.username = 'Anonymous'
  };
  next();
});

router.post('/*', function(req, res, next){
  req.viewargs = {};
  if(req.session.username){     // There is a login
    req.viewargs.loggedIn = true;
    req.viewargs.username = req.session.username
  } else{                   // Anonymous session
    req.viewargs.loggedIn = false;
    req.viewargs.username = 'Anonymous'
  };
  next();
});

// /index
router.get('/', function(req, res, next) {
  res.render('index', req.viewargs);
});

// /about
router.get('/about', function(req, res, next) {
  res.render('about', req.viewargs);
});

router.get('/learn', function(req, res, next){
  res.render('learn', req.viewargs);
});

module.exports = router;
