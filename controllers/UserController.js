
const UserModel = require("../models/UserModel");

function UserController(){
	
};

UserController.prototype ={
	//登录
	login : function(req, res, next) {
		
		const {username,password} = req.body;
		
    UserModel.find({username,password},function(data){
    	if(data.length===1){
    		//在session中保存登录成功的用户名
    		
    		req.session.loginUser = data[0].username;
    		
    		res.json({res_code:1,res_error:"",res_body:{username:data[0].username}});
    	}else{
    		res.json({res_code:0,res_error:"用户名或密码错误",res_body:{}});
    	}

    });
 
  },
  // 是否已经登录
  isLogin : function(req,res,next){
  	
  	if(req.session.loginUser){
  		res.json({res_code:1,res_error:"",res_body:{username:req.session.loginUser}});
  	}else{
  		res.json({res_code:0,res_error:"用户未登录",res_body:{}});
  	}
  },
  
  //注销登录
  loginOut : function(req,res,next){
  	 req.session = null;
  	 res.json({res_code:1,res_error:"",res_body:{}});
  },
  
    //注册
    register : function(req,res,next){
    	
    	 const {username,password,email} = req.body;

    	 UserModel.insert({username,password,email},function(data){
    	 	
           if(data){
    	 	 	res.json({res_code:1, res_error:"", res_body:{}});
    	 	 }else{
    	 	 	res.json({res_code:0, res_error:"注册失败", res_body:{}});
    	 	 };
    	 
    	 });
    },
    
    //验证用户名是否已存在
    yanzheng_name : function(req,res,next){
	     const {username} = req.query;
	     UserModel.find({username},function(data){
//  	 	console.log(data);
    	 	 if(data.length == 1){
    	 	 	res.json({res_code:0, res_error:"用户名已存在", res_body:{data}});
    	 	 }else{
    	 	 	res.json({res_code:1, res_error:"用户名不存在，可注册", res_body:{}});
    	 	 }
    	 });
	     
    }
    
    
};

module.exports = new UserController();
