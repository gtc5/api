let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function(req, res){
  res.send("hello");
});

app.post("/signin", function(){
  //given a proper username and password, issues a token that the oth endpoints accept
});

app.post("/post", function(req, res){
  req.body;
  //Posts a pickup request
});

app.post("/claim", function(req, res){
  req.body;
  //Claims a request to execute
});

app.post("/pickedup", function(){
  req.body;
  //Notes that the item has been successfully picked up
});

app.post("/delivered", function(){
  req.body;
  //Notes that the item has been successfully delivered
});

app.listen(process.env.PORT, function(){
  console.log("Listening on :" + process.env.PORT);
});

