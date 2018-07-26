var express = require('express');
var router = express.Router();
var PositionController = require("../controllers/PositionController");
var multer = require("multer");//向服务器传图片或文件，用到multer，先安装再引入

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/images/upload');
	},
	filename : function(req,file,cb){
	cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf(".")))
		
	}
});

var upload = multer({storage:storage});
//添加职位
router.post("/add",upload.single("logo"),PositionController.add);
//查询数据库中所有的记录条数
router.get("/countAllPosition",PositionController.countAllPosition);

router.get("/loadPositionByCurrentPage",PositionController.loadPositionByCurrentPage);

router.get("/del_position",PositionController.del_position);

router.get("/findPostionById",PositionController.findPostionById);

router.post("/modifyPosition",upload.single("logo"),PositionController.modifyPosition);

module.exports = router;