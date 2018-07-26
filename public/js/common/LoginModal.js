function LoginModal(){
    this.element = null;
    this.createDom();
    this.registerEventListener();

}

LoginModal.template = 
`<div class="modal fade" id="login_Modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
                <h4 class="modal-title">用户登录</h4>
            </div>
            
            <div class="modal-body">
                <form>
                <div class="alert alert-danger login_error hide" role="alert">用户名或密码错误</div>
                    <div class="form-group">
                        <label for="loginUsername">用户名</label>
                        <input type="text" class="form-control" id="loginUsername" placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">密码</label>
                        <input type="password" class="form-control" id="loginPassword" placeholder="请输入密码">
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary btn_login">登录</button>
            </div>
        </div>
    </div>
</div>`;

LoginModal.prototype ={
    createDom : function(){
        this.element = $(LoginModal.template);
        this.element.appendTo('body');
    },
    registerEventListener : function(){
        $(".btn_login").on("click",$.proxy(this.loginHandler,this));

    },
    
    loginHandler:function(){
           var username = $("#loginUsername").val(),
               password = $("#loginPassword").val();
           $.post("/api/users/login",{username,password},function(data){
             console.log(data);
           	 if(data.res_code == 1){	 	
           	 	$("#login_Modal").modal("hide");
           	 	location.reload();
           	 
           	 }else{
           	 	$(".login_error").removeClass("hide");
           	 }
           });
        }
}