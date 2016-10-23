let Database = require("gtc5-db");

Database.then(function(db){
  db.collection("donors").insert([
  	{name: "Alexander Hamilton", location: "New York City, New York, USA"}
  ]).then(function(inserted){
  	return inserted.insertedIds[1];
  }).then(function(id){
    db.collection("volunteers").insert([
      {name: "Damien Sanderson", availability: {
        "Tuesday 4-5pm, Thursday 2-3pm": "45 Reginald Rd.",
        "Wednesday 3-6pm": "9001 Pennsylvania Avenue"
      }}
    ]);

	db.collection("deliveries").insert([
	  {donor: "Alexander Hamilton",
	  donorId: id,
	  location: "New York City, New York, USA",
	  takeBy: "2 Nov 1945 9:30:22PM",
	  location: "460 King St. West",
      food: "46 pounds of lettuce",
	  status: 0}
	]);
  }).catch(function(err){
  	console.error("Error!", err);
  }).then(function(){
  	console.log("Success!");
  });
});
