let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const PORT = process.env.PORT || 33033;

let Database = require("./Database");
let Delivery = require("./Delivery");
let Volunteer = require("./Volunteer");

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

app.use(bodyParser.urlencoded());

app.get("/", function(req, res){ res.send("Second Harvest API Server"); });


//given a proper username and password, issues a token that the other endpoints require
app.post("/signin", function(req, res){});
//expire the token
app.post("/signout", function(req, res){});
//[use an npm module for this]


//Individual handling for these api routes
app.use("/admin", require("./routes/admin"));
app.use("/donor", require("./routes/donor"));
app.use("/volunteer", require("./routes/volunteer"));



app.listen(PORT, function(){
  console.log("Listening on :" + PORT);
});

