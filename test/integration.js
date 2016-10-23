process.env.NODE_ENV = "test";
process.env.PORT = 79079;

let baseurl = "http://localhost:" + process.env.PORT;

require("../initMongo");
require("../server");

let expect = require("chai").expect;
let request = require("request");

describe("auth", function(){
  //case-insensitive username
  //user flow with errors
  //invalid username/password
  
  it("makes requests properly")
  request(baseurl + "/donor/register?username=alexander&password=hamilton").then(function(res){
    return request(baseurl + "/donor/auth?username=alexander&password=hamilton")
    request(baseurl + "/donor/getdelivery?token=" + token)
  
  it("", function(done){
    
  });
  it("generates a token", function(done){
    
  });
  it("accepts the token", function(done){
    
  });
});
