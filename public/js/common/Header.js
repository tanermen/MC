 //头部对象
function Header(container){
    this.container = container;
    this.element  = null;
    this.createDom();
    this.createLoginModal();
    this.createRegisterModal();
    this.getLoginStatus();
    this.loginOut();
}
Header.template = `<nav class="navbar navbar-default navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">拉勾网管理系统</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="/index.html">首页</a></li>
            <li class="list"><a href="/html/list.html">职位管理</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li data-toggle="modal" data-target="#login_Modal"><a href="javascript:void(0)">登录</a></li>
            <li data-toggle="modal" data-target="#register_Modal"><a href="javascript:void(0)">注册</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right login_success hide">
		        <li><a href="#"></a></li>
		        <li><a href="javascript:void(0);">注销</a></li>
		      </ul>
        </div>
      </div>
    </nav>`;
Header.prototype ={
	
	
  createDom :function(){
     this.element = $(Header.template);
     this.element.appendTo(this.container);
  },
  createLoginModal:function(){
    new LoginModal();
  },
  createRegisterModal:function(){
    new RegisterModal();
  },
  
 //判断用户是否登录
 
 getLoginStatus : function(){
 	$.getJSON("/api/users/isLogin",function(data){
 		if(data.res_code===1){
 			$(".login_success").removeClass("hide").prev().addClass("hide");
            $(".login_success a:eq(0)").text("欢迎您"+data.res_body.username);
 		}else{
 			$(".login_success").addClass("hide").prev().removeAttr("hide");
 		}
 	});
 },
 
 // 注销用户
 
 loginOut : function(){
 	$(".login_success a:eq(1)").click(function(){
 		$.getJSON("/api/users/loginOut",function(data){
 		if(data.res_code===1){
 			location.reload();
 		}
 	});
 	});
 	
 }
  
};