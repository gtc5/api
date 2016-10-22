let app = require("express")();
let jwt = require("jsonwebtoken");
let Database = require("../Database");
let crypto = require("crypto");

function auth(collection, username, password){
  var db;
  return Database.then(function(_db){
    db = _db;
    return db.collection(collection).find({username: username}).toArray();
  }).then(function(items){
    return new Promise(function(resolve, reject){
      console.log(username, password, items);
      if(!items || !items[0])
        reject("Incorrect username or password.");
      else{
        console.log(items[0]);
        crypto.pbkdf2(password, items[0].salt, 1000, 512, "sha1", function(err, derivedKey) {
          if(err) reject(err);
          else if(items[0].passhash != derivedKey.toString("hex")) reject("Incorrect username or password." + JSON.stringify(items[0]) + derivedKey.toString("hex") + password);
          else resolve();
        });
      }
    });
  })
  .then(genToken)
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
    if(!token || !items || !items[0] || items[0].token != token)
      throw new Error("Invalid token.");
  });
}

app.get("/donor/auth", function(req, res, next){
  auth("donors", req.query.username, req.query.password)
  .then(function(token){res.send({token: token});})
  .catch(function(err){console.error(err);res.send({error: "Incorrect username or password."});});
});
app.get("/donor/*", function(req, res, next){
  checkToken("donors", req.query.token).then(next).catch(function(){res.send({error: "Invalid token."});});
});

app.get("/volunteer/auth", function(req, res, next){
  auth("donors", req.query.username, req.query.password)
  .then(function(token){res.send({token: token});})
  .catch(function(err){console.error(err);res.send({error: "Incorrect username or password."});});
});
app.get("/volunteer/*", function(req, res, next){
  checkToken("donors", req.query.token).then(next).catch(function(){res.send({error: "Invalid token."});});
});

module.exports = app;
