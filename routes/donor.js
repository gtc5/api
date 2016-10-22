let app = require("express")();

app.post("/adddelivery", function(req, res){
  //Posts a pickup request, returns id of delivery
});
app.post("/getdelivery", function(req, res){
  res.send(JSON.stringify({
  	donor: "Alexander Hamilton",
  	id: "h93898yt924ydiuergh8dry2e2",
  	time: "2 Nov 1945 9:30:22PM",
  	location: "460 King St. West",
  	food: "46 pounds of lettuce",
  	status: 0
  });
});
app.post("/pickedup", function(req, res){
  //Note that current delivery has been picked up
});

module.exports = app;
