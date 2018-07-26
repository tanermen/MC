
var mongoose = require("./db.js"),
    Schema = mongoose.Schema;
    
    
  var PositionSchema = new Schema({
  	 logo : {type:String},
  	 position_name: {type:String},
  	 company_name : {type:String},
  	 email : {type : String}
  });

 module.exports = mongoose.model("position",PositionSchema);