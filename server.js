let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let Database = require("./Database");
let Delivery = require("./Delivery");

function jsonpDump(collection, req, res){
  Database.then(function(db){
    return collection(collection).find().toArray();
  }).then(function(result){
    if(req.query.callback)
      res.write(req.query.callback.replace(/[^\w\.]/g, '') + "(");

    res.write(JSON.stringify(result));

    if(req.query.callback)
      res.write(");");

    res.end();
  }).catch(function(err){
    console.error(err);
  });
}

app.use(bodyParser.urlencoded());

app.get("/", function(req, res){
  res.send("Second Harvest API Server");
});

// location-time pairs
app.get("/volunteers", function(req, res){
  jsonpDump("volunteers", req, res);
});

// location
app.get("/donors", function(req, res){
  jsonpDump("donors", req, res);
});

// donor ID, pickup time, pickup location, food type, food quantity, volunteer ID, 
// time of posting, time of confirmation, time of pickup, time of delivery
app.get("/deliveries", function(req, res){
  jsonpDump("deliveries", req, res);
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

