let app = require("express")();
let jwt = require("jsonwebtoken");
let Database = require("../Database");

function auth(collection, username, password){
  var db;
  return Database.then(function(_db){
    db = _db;
    return db.collection(collection).find({username: username}).toArray();
  }).then(function(items){
    if(!items || !items[0] || items[0].passhash != items[0].salt + password)
      throw new Error("Wrong username or password.");
  }).then(genToken)
  .then(function(token){
    db.collection(collection).update({username: username}, {"$set": {token: token}});
    return token;
  })
}
function genToken(){
  return new Promise(function(resolve,reject){
    require('crypto').randomBytes(64, function(err, buffer) {
      if(err) reject(err);
      else resolve(buffer.toString('hex'));
    });
  });
}
function checkToken(collection, token){
  return Database.then(function(db){
    return db.collection(collection).find({token: token}).toArray();
  }).then(function(items){
    if(!items || !items[0])
      throw new Error("Wrong token.");
  });
}

app.get("/donor/auth", function(req, res, next){
  auth("donors", req.query.username, req.query.password)
  .then(function(token){res.send({token: token});})
  .catch(next);
});
app.get("/donor/*", function(req, res, next){
  checkToken("donors", req.query.token).then(next).catch(next);
});

app.get("/volunteer/auth", function(req, res, next){
  auth("donors", req.query.username, req.query.password)
  .then(function(token){res.send({token: token});})
  .catch(next);
});
app.get("/volunteer/*", function(req, res, next){
  checkToken("donors", req.query.token).then(next).catch(next);
});

module.exports = app;
