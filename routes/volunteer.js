let app = require("express")();

app.post("/open", function(req, res){

});
app.post("/tasks", function(req, res){
  req.body;
  //Claims a request to execute
});
app.post("/assign", function(req, res){
  req.body;
});
app.post("/pickedup", function(req, res){
  req.body;
  //Notes that the item has been successfully picked up
});
app.post("/delivered", function(req, res){
  req.body;
  //Notes that the item has been successfully delivered
});

module.exports = app;
