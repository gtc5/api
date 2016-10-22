let Database = require("./Database");

module.exports = function(collection, username, password){
  Database.then(function(db){
  	return db.collection(collection).find();
  })
};
