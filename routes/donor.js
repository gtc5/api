let app = require("express")();
let Database = require("../Database");

app.get("/adddelivery", function(req, res){
  //Posts a pickup request, returns id of delivery
});
app.get("/getdelivery", function(req, res){
  Database.then(function(db){
  	db.collection("deliveries").find().toArray().then(function(err, items){
      if(err)
    	return next(err);
      res.send(JSON.stringify(items[0]));
      console.log("Stuff");
    });
  });
});
app.get("/pickedup", function(req, res){
  //Note that current delivery has been picked up
});

module.exports = app;
