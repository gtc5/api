let Database = require("./Database");

module.exports = function(username, password){
  Database.then(function(db){
  	return db.collection("volunteers").find();
  })
};
