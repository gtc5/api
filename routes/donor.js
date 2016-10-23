let app = require("express")();
let Database = require("gtc5-db");

app.all("/adddelivery", function(req, res, next){
  var del = {
    donor: req.user.name,
    donorId: req.user._id,
    
    location: req.query.location,
    takeBy: req.query.takeBy,
    food: req.query.food,
    timePosted: new Date().getTime(),
    
    volunteer: null,
    volunteerId: null,
    timeAssigned: null,
    
    timePickedUp: null,
    
    timeDelivered: null,
    
    status: 0 //0 posted, 1 assigned, 2 picked up, 3 delivered
  };
  
  Database.then(function(db){
    return db.collection("deliveries").insert(del);
  }).then(function(){
    res.send({_id: del._id});
  }).catch(next);
});

app.all("/getdelivery", function(req, res, next){
  Database.then(function(db){
    return db.collection("deliveries").findOne({donorId: req.user._id, status: {"$ne": 3}});
  }).then(function(del){res.send(del);}).catch(next);
});

app.all("/pickedup", Database.deliveryUpdate(
  req=>({donorId: req.user._id, status: {"$ne": 3}}),
  req=>({"$set": {timePickedUp: new Date().getTime(), status: 2}})
));

module.exports = app;
