function ListPage(){
   this.init();
   this.position_handle();
}
ListPage.prototype ={
    init:function(){
       new CommonResourceLoader().loadHeader(".header");
    
        $(".list").addClass("active").siblings("li").removeClass("active");
    },
    
    position_handle : function(){

    	new Position();
    }
}

new ListPage();