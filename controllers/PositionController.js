
const PositionModel = require('../models/PositionModel');
const fs = require("fs");

var PositionController = function(){
	
};


PositionController.prototype = {
	//添加职位
	add : function(req,res,next){
		const {name,company,exprience,position_type,address,salary} = req.body;
		let logo;
		if (req.file)
			logo = "/images/upload/" + req.file.filename;

	PositionModel.insert({logo,name,company,exprience,position_type,address,salary},function(data){
	
		res.json({res_code:1,res_error:"",res_body:{data}});
		
		});
	},
	//查询所有职位条数
  countAllPosition : function(req,res,next){
  	
  	PositionModel.countAllPosition({},function(data){	
  		
  	   res.json({res_code:1,res_error:"",res_body:{data}});
	
  	});
  	
  },
  
  //根据当前页码和页面记录条数做条件查询
  loadPositionByCurrentPage : function(req,res,next){
  	const {currentPage,pageSize} = req.query;
  	  PositionModel.loadPositionByCurrentPage(Number(currentPage),Number(pageSize),function(data){ 	
  	  	res.json({res_code:1,res_error:"",res_body:{data}});
  	  });
  },
  
  //删除职位
  del_position : function(req,res,next){
  	const {_id,_logo} = req.query;
  	fs.unlink("./public"+_logo);//删除文件夹里的文件
  	PositionModel.del_position(_id,(data)=>{
		if(data){
			res.json({res_code:1,res_error:"删除成功",res_body:{data}});
		}else{
			res.json({res_code:0,res_error:"删除失败",res_body:{}});
		}
	});
  },
  
  //通过id查找职位数据
  findPostionById : function(req,res,next){
  	const {_id} = req.query;
  	
  	PositionModel.findPostionById(_id,function(data){
  		res.json({res_code:1,res_error:"查找成功",res_body:{data}});
  	});
  },
  
  //数据更新
  modifyPosition : function(req,res,next){
//	 console.log(req.body,"00");
  	 const {_id,_logo,name,company,exprience,position_type,address,salary} = req.body;
  	  let logo;
		if (req.file){//如果修改时，重新上传图片
			logo = "/images/upload/" + req.file.filename;
		}else{//如果修改时，未重新上传图片，则使用原图片路径
			logo = _logo;
		}
		
  	PositionModel.modifyPosition(_id,{name,company,exprience,position_type,address,salary,logo},{new:true},function(data){
//		console.log(data,"33");
  		if(data){
			res.json({res_code:1,res_error:"修改成功",res_body:{data}});
		}else{
			res.json({res_code:0,res_error:"修改失败",res_body:{}});
		}
  	});
  }
  
}


 module.exports = new PositionController();