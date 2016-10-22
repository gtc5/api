let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const PORT = process.env.PORT || 33033;

//let Delivery = require("./Delivery");
//let Volunteer = require("./Volunteer");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){ res.send("Second Harvest API Server"); });

app.use("/apply", require("./routes/apply"));

app.use("/", require("./routes/auth"));

//Individual handling for these api routes
app.use("/admin", require("./routes/admin"));
app.use("/donor", require("./routes/donor"));
app.use("/volunteer", require("./routes/volunteer"));

app.use(function(err, req, res, next){
  res.send("Oops, something broke! Check the logs.");
  console.error(err);
});


app.listen(PORT, function(){
  console.log("Listening on :" + PORT);
});
