let express = require("express");
let app = express();

app.get("/", function(req, res){
  res.send("hello");
});
app.listen(process.env.PORT, function(){
  console.log("Listening on :" + process.env.PORT);
});

