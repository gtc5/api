let Database = require("./Database");

module.exports = function(username, password){
  Database.then(function(db){
  	return db.collection("donors").find({username: username, password: password});
  })
};
