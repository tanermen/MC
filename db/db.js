var mongoose = require("mongoose"),
    DB_URL = "mongodb://localhost:27017/tanermen";
/*连接*/
mongoose.connect(DB_URL);
/*连接成功提示*/
mongoose.connection.on("connected",function(){
	console.log("Mongoose connection open to:"+DB_URL);
});

//console.log(mongoose);

module.exports = mongoose;
