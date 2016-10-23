let app = require("express")();
let Database = require("gtc5-db");

app.get("/availableDeliveries", function(req, res){
  
});
app.get("/myDeliveries", function(req, res){
  
});
app.get("/assign", Database.deliveryUpdate(
  req=>({_id: new (require("mongodb").ObjectID)(req.params.deliveryId), status: 0}),
  req=>({"$set": {volunteer: req.user.name, volunteerId: req.user._id, timePickedUp: new Date().getTime(), status: 1}})
));
//app.get("/pickedup", function(req, res, next){
  //Notes that the item has been successfully picked up -- THIS IS DONE ON DONOR SIDE.
//});
app.get("/delivered", Database.deliveryUpdate(
  req=>({volunteerId: req.user._id, status: 2}),
  req=>({"$set": {timeDelivered: new Date().getTime(), status: 3}})
));

module.exports = app;
