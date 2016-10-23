let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const PORT = process.env.PORT || 33033;

//let Delivery = require("./Delivery");
//let Volunteer = require("./Volunteer");

app.use(bodyParser.urlencoded({extended: true}));

app.all("/", function(req, res){ res.send("Second Harvest API Server"); });

//Individual handling for these api routes
app.use("/admin", require("./routes/admin"));
app.use("/donor", require("./routes/auth")("donors", ["name", "location"]), require("./routes/donor"));
app.use("/volunteer", require("./routes/auth")("volunteers", ["name", "availability"]), require("./routes/volunteer"));

app.use(function(err, req, res, next){
  res.send(500, "Oops, something broke! Error message: " + err);
  console.error(err);
});


app.listen(PORT, function(){
  console.log("Listening on :" + PORT);
});
