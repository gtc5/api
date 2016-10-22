let app = require("express")();

let Database = require("../Database");

function jsonpDump(collection, req, res){
  Database.then(function(db){
    return db.collection(collection).find().toArray();
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


// location-time pairs
app.get("/volunteers", function(req, res){ jsonpDump("volunteers", req, res); });
// location
app.get("/donors", function(req, res){ jsonpDump("donors", req, res); });
// donor ID, donor name/other info, desired pickup time, pickup location, food [string containing all info], volunteer ID, 
// time of posting, time of confirmation, time of pickup, time of delivery, status
app.get("/deliveries", function(req, res){ jsonpDump("deliveries", req, res); });

module.exports = app;
