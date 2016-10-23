let app = require("express")();
let Database = require("gtc5-db");

app.all("/availableDeliveries", function(req, res, next){
  Database.then(function(db){
    return db.collection("deliveries").find().toArray();
  }).then(function(items){res.send(items);}).catch(next);
});
app.all("/myDeliveries", function(req, res, next){
  Database.then(function(db){
    return db.collection("deliveries").find({volunteerId: new (require("mongodb").ObjectID)(req.user._id)}).toArray();
  }).then(function(items){res.send(items);}).catch(next);
});
app.all("/assign", Database.deliveryUpdate(
  req=>({_id: new (require("mongodb").ObjectID)(req.params.deliveryId), status: 0}),
  req=>({"$set": {volunteer: req.user.name, volunteerId: req.user._id, timePickedUp: new Date().getTime(), status: 1}})
));
//app.get("/pickedup", function(req, res, next){
  //Notes that the item has been successfully picked up -- THIS IS DONE ON DONOR SIDE.
//});
app.all("/delivered", Database.deliveryUpdate(
  req=>({volunteerId: req.user._id, status: 2}),
  req=>({"$set": {timeDelivered: new Date().getTime(), status: 3}})
));

module.exports = app;
