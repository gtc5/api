let app = require("express")();

let Database = require("gtc5-db");

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


app.all("/volunteers", function(req, res){ jsonpDump("volunteers", req, res); });
app.all("/donors", function(req, res){ jsonpDump("donors", req, res); });
app.all("/deliveries", function(req, res){ jsonpDump("deliveries", req, res); });

module.exports = app;
