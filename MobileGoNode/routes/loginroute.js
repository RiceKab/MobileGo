var express = require('express');
var router = express.Router();
var session = require('express-session');

// /login
router.get('/', function(req, res, next) {
  // TODO: Potential for a loop if https is unavailable and it defaults back to http
  // Also means can't login when no https available (this if fine though)
  //if (!req.secure) {
  //return res.redirect('https://' + req.headers.host + req.url);
  //}
  res.render('login', req.viewargs);
});

// /login/doLogin
router.post('/doLogin', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  // TODO EXTRA: Actual login system
  if(password == username.toUpperCase()){   // Login OK
    req.session.username = username;
    res.redirect('/');
  } else{
    req.viewargs.loginerrors = ["Invalid user/password combination"];
    res.render('login', req.viewargs);
  }
});

// /login/doLogout
router.get('/doLogout', function(req, res, next){
  delete req.session.username;
  res.redirect('/');
});
module.exports = router;