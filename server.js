let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongodb = require("mongodb");

let MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/gtc5"
const PORT = process.env.PORT || 33033;

var db;
MongoClient.connect(url).then(function(_db){
  console.log("Connected to MongoDB");
  db = _db;
}).catch(function(err){
  console.error(err);
});


app.use(bodyParser.urlencoded());

app.get("/", function(req, res){
  res.send("Second Harvest API Server");
});

app.get("/volunteers", function(req, res){
  db.collection("volunteers").find().toArray().then(function(result){
    if(req.query.callback)
      res.write(req.query.callback.replace(/[^\w\.]/g, '') + "(");
    res.write(JSON.stringify(result));
    if(req.query.callback)
      res.write(");");
    res.end();
  }).catch(function(err){
    console.error(err);
  });
});

app.get("/donors", function(req, res){
  db.collection("donors").find().toArray().then(function(result){
    if(req.query.callback)
      res.write(req.query.callback.replace(/[^\w\.]/g, '') + "(");
    res.write(JSON.stringify(result));
    if(req.query.callback)
      res.write(");");
    res.end();
  }).catch(function(err){
    console.error(err);
  });
});

app.post("/signin", function(req, res){
  [req.body.username]
  //given a proper username and password, issues a token that the other endpoints accept
});

app.post("/post", function(req, res){
  req.body;
  //Posts a pickup request
});

app.post("/claim", function(req, res){
  req.body;
  //Claims a request to execute
});

app.post("/pickedup", function(req, res){
  req.body;
  //Notes that the item has been successfully picked up
});

app.post("/delivered", function(req, res){
  req.body;
  //Notes that the item has been successfully delivered
});

app.listen(PORT, function(){
  console.log("Listening on :" + PORT);
});

