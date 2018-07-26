function RegisterModal(){
    this.element = null;
    this.createDom();
    this.registerEventListener();
}

RegisterModal.template=`<div class="modal fade" id="register_Modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
        <h4 class="modal-title" id="re_Modal">用户注册</h4>
      </div>
      <div class="modal-body">
      
     <form method="get">
  <div class="form-group">
 
    <label for="register_Username">用户名</label>
    <input type="text" class="form-control" id="register_Username" placeholder="请输入用户名">
  </div>
   <div class="alert alert-danger reg_error hide" role="alert">用户名已存在</div>
  <div class="form-group">
    <label for="register_Password">密码</label>
    <input type="password" class="form-control" id="register_Password" placeholder="请输入密码">
  </div>
  <div class="form-group">
    <label for="s_register_Password">确认密码</label>
    <input type="password" class="form-control" id="s_register_Password" placeholder="再次输入密码">
  </div>
   <div class="alert alert-danger sure_password hide" role="alert">
   两次密码输入不一致</div>
  <div class="form-group">
    <label for="registerEmail1">邮箱</label>
    <input type="email" class="form-control" id="registerEmail1" placeholder="输入email地址">
  </div>
   <div class="alert alert-danger sure_email hide" role="alert">邮箱格式不正确</div>
    <div class="alert alert-danger sure_submit hide" role="alert">
   注册信息不全或格式错误</div>
</form>
     
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>-->
        <button type="button" class="btn btn-primary btn_register">注册</button>
      </div>
    </div>
  </div>
</div>`;
RegisterModal.prototype = {
    createDom : function(){
     this.element =$(RegisterModal.template);
     this.element.appendTo('body');
    },
    
    registerEventListener : function(){
    	$(".btn_register").on("click",$.proxy(this.registerHandler,this));
    	$("#register_Username").on("blur",$.proxy(this.yanzheng_name,this));
    	$("#s_register_Password").on("blur",$.proxy(this.sure_password,this));
    	$("#registerEmail1").on("blur",$.proxy(this.sure_email,this));
    	$("#register_Username,#register_Password,#s_register_Password,#registerEmail1").on("blur",$.proxy(this.all_blur,this));
    },
    
    //实现注册操作
    registerHandler : function(){
    	var username = $("#register_Username").val(),
    	    password = $("#register_Password").val(),
    	    s_password = $("#s_register_Password").val(),
    	    email = $("#registerEmail1").val(),
    	    status1 = $(".sure_password").hasClass("hide"),
    	    status2 = $(".reg_error").hasClass("hide"),
    	    status3 = $(".sure_email").hasClass("hide");
//  	    console.log(status1,status2);
    	if(username!=""&&password!=""&&s_password!=""&&email!=""&&status1&&status2&&status3){

    		$.post("/api/users/register",
    	 {username,password,email},
    	  function(data){
//  	  	console.log(data);
    	  	if(data.res_code==1){
    	  		$("#register_Modal").modal("hide");	
    	  		$(".sure_submit").addClass("hide");
    	  		location.reload();//不刷新，再次注册将所有输入框清空
     	  	}

    	  });
    	}else{
    		$(".sure_submit").removeClass("hide");
    	}
    },
    
     //所有注册信息完全且格式正确，所有输入框失去焦点后，将.sure_submit隐藏
     all_blur : function(){
     	var username = $("#register_Username").val(),
    	    password = $("#register_Password").val(),
    	    s_password = $("#s_register_Password").val(),
    	    email = $("#registerEmail1").val(),
    	    status1 = $(".sure_password").hasClass("hide"),
    	    status2 = $(".reg_error").hasClass("hide"),
    	    status3 = $(".sure_email").hasClass("hide");
    	if(username!=""&&password!=""&&s_password!=""&&email!=""&&status1&&status2&&status3){
    		$(".sure_submit").addClass("hide");
    	}
    	  
     },
    //验证用户名是否已存在
    yanzheng_name : function(){
    	var username = $("#register_Username").val();
    	$.get("/api/users/yanzheng_name",{username},function(data){
//  		console.log(data);
    		if(data.res_code == 0){
    			$(".reg_error").removeClass("hide");
    		}else{
  			$(".reg_error").addClass("hide");
    		}
    	});
    },
    //验证密码与确认密码一致
    sure_password : function(){
    	var s_register_Password = $("#s_register_Password").val(),
    	    register_Password = $("#register_Password").val();
    	if(s_register_Password !== register_Password){
    		$(".sure_password").removeClass("hide");
    	}else{
    		$(".sure_password").addClass("hide");
    	}
    },
   //验证邮箱格式
    sure_email : function(){
    	var sure_email = $("#registerEmail1").val(),
    	    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    	  if(!reg.test(sure_email)){
    	  	$(".sure_email").removeClass("hide");
    	  }else{
    	  	$(".sure_email").addClass("hide");
    	  }
    	 
    }
    
    
}