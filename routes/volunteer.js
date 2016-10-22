let app = require("express")();

app.get("/open", function(req, res){

});
app.get("/tasks", function(req, res){
  req.body;
  //Claims a request to execute
});
app.get("/assign", function(req, res){
  req.body;
});
app.get("/pickedup", function(req, res){
  req.body;
  //Notes that the item has been successfully picked up
});
app.get("/delivered", function(req, res){
  req.body;
  //Notes that the item has been successfully delivered
});

module.exports = app;
