
let app = require("express")();
let jwt = require("jsonwebtoken");

function auth(username, password){
  return new Promise(function(resolve, reject){resolve();});
}

app.get("/auth", function(req, res){
  auth(req.query.username, req.query.password).then(function(){
    /*GENERATE, STORE, and SEND TOKEN*/
  }).catch(function(err){
  	res.send(401);
  });
});

app.all("/*", function(req, res, next){
  if(true)
    next();
  else
    res.send(401);
});

module.exports = app;
