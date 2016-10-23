let app = require("express")();
let Database = require("gtc5-db");
let crypto = require("crypto");

function hash(password, salt){
  return new Promise(function(resolve,reject){
    crypto.pbkdf2(password, salt, 1000, 128, "sha1", function(err, derivedKey) {
      if(err) reject(err);
      else resolve(derivedKey.toString("hex"));
    });
  });
}

function auth(collection, username, password){
  var db, passhash;
  return Database.then(function(_db){
    db = _db;
    return db.collection(collection).find({username: username}).toArray();
  })
  .then(function(items){
    if(!items || !items[0]) throw new Error;
    passhash = items[0].passhash;
    return hash(password, items[0].salt);
  })
  .then(function(derivedKey){
    if(passhash != derivedKey) throw new Error;
  })
  .then(genToken)
  .then(function(token){
    db.collection(collection).update({username: username}, {"$set": {token: token}});
    return token;
  });
}
function genToken(){
  return new Promise(function(resolve,reject){
    require('crypto').randomBytes(64, function(err, buffer) {
      if(err) reject(err);
      else resolve(buffer.toString('hex'));
    });
  });
}
function getUserByToken(collection, token){
  return Database.then(function(db){
    return db.collection(collection).find({token: token}).toArray();
  }).then(function(items){
    if(!token || !items || !items[0] || items[0].token != token)
      throw new Error;
    else return items[0];
  });
}
function createAccount(collection, entry, req, res){
  entry.username = req.query.username;
  //TODO: verification that the input is well-formed
  // - non duplicate username, valid username, password
  
  return genToken().then(function(salt){
    entry.salt = salt;
    return hash(req.query.password, salt);
  }).then(function(passhash){
    entry.passhash = passhash;
    return Database;
  }).then(function(db){
    return db.collection(collection).insert(entry);
  }).then(function(inserted){
    res.send({_id: entry._id.toString()});
  }).catch(function(err){
    res.send({error: err});
  });
}

function tokenFrom(req){
  return req.header("Authorization") || req.query.token;
}

var collection = null, props = null;

app.get("/auth", function(req, res){
  auth(collection, req.query.username, req.query.password)
  .then(function(token){res.send({token: token});})
  .catch(function(err){console.error(err);res.send({error: "Incorrect username or password."});});
});
app.get("/register", function(req, res){
  var entry = {};
  for(var i = 0; i < props.length; i++)
    entry[props[i]] = req.query[props[i]];
  createAccount(collection, entry, req, res);
});
app.get("/*", function(req, res, next){
  getUserByToken(collection, tokenFrom(req))
  .then(function(user){req.user = user; user._id = user._id.toString();})
  .then(next)
  .catch(function(){res.send({error: "Invalid token."});});
});


module.exports = function(_collection, _props){
  collection = _collection;
  props = _props;
  return app;
};
