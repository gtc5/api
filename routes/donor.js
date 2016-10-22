let app = require("express")();
let Database = require("../Database");

app.get("/adddelivery", function(req, res){
  //Posts a pickup request, returns id of delivery
});
app.get("/getdelivery", function(req, res, next){
  console.log("got");
  Database.then(function(db){
  	return db.collection("deliveries").find().toArray();
  }).then(function(items){
    res.send(JSON.stringify(items[0]));
  }).catch(next);
});
app.get("/pickedup", function(req, res){
  //Note that current delivery has been picked up
});

module.exports = app;
