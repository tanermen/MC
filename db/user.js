var mongoose = require("./db.js"),
    Schema = mongoose.Schema;
    
    
  var UserSchema = new Schema({
  	 username : {type:String},
  	 password : {type:String},
  	 s_password : {type:String},
  	 email : {type : String}
  });


    
 module.exports = mongoose.model("User",UserSchema);
 
