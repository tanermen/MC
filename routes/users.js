var express = require('express');
var router = express.Router();
var UserController = require("../controllers/UserController");

router.post('/login',UserController.login);

router.post('/register',UserController.register);

router.get('/yanzheng_name',UserController.yanzheng_name);

router.get('/isLogin',UserController.isLogin);

router.get('/loginOut',UserController.loginOut);

module.exports = router;
