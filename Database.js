let mongodb = require("mongodb");

let MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/gtc5"

var promise = MongoClient.connect(url).then(function(db){
  console.log("Connected to MongoDB");
  return db;
}).catch(function(err){
  console.error(err);
});

module.exports = promise;
