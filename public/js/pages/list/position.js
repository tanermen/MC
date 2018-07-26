function Position(){
	this.registerEventListener();
	this.countAllPosition();
	this.modify_position();
	this.currentPage = 1;
	this.pageSize = 5;
	this.pages = 1;
	this.positionsNum = 0;
	// 打开页面默认显示第一页
	this.loadPositionByCurrentPage(1,5);
}
// ejs职位模板                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 密码
Position.rowTemplate = `<% for (var i = 0; i < positions.length; i++) { var p = positions[i]; %>
	  <tr>
	     <td><%= i + index +1 %></td>
	  	 <td><img src="<%= p.logo%>"/></td>
	  	 <td><%= p.name%></td>
	  	 <td><%= p.company%></td>
	  	 <td><%= p.exprience%></td>
	  	 <td><%= p.position_type%></td>
	  	 <td><%= p.address%></td>
	  	 <td><%= p.salary%></td>
	  	 <td><a href="#" data-toggle="modal" data-target="#modify" class="modify_link" data-id="<%= p._id%>">修改</a></td>
		 <td><a href="#" class="del">删除</a></td>
	  </tr>
	<% } %>`;

Position.prototype = {
	registerEventListener : function(){
		$("#btn_submit").on("click",$.proxy(this.addPosition,this));
		$(".btn_pages_body").on("click","span",$.proxy(this.changePageByprevAndNext,this));
		$(".btn_pages_body").on("click","a",$.proxy(this.changePageByNum,this));
		$(".position_body").on("click",".del",$.proxy(this.del_position,this));
	    $(".position_body").on("click",".modify_link",$.proxy(this.findPostionById,this));
	},
	//添加职位
	addPosition : function(){
		var that = this;
		//要用ajax传图片数据，保存到数据库，需要对ajax做一些配置，表格包装成formdata对象
		var formData = new FormData($(".add_position_form")[0]);
		$.ajax({
			type:"post",
			url :"/api/positions/add",
			data : formData,
			processData:false,
			contentType : false,
			success : function(data){
//				console.log(data);
				$("#add").modal("hide");
	  	      that.countAllPosition();
             if(that.positionsNum%that.pageSize==0){
             	that.currentPage = that.pages + 1;
              }else{
              	that.currentPage = that.pages;
              }
	    that.loadPositionByCurrentPage(that.currentPage,that.pageSize);
			}
		});
	},
	//查询，先查询数据库中所有的记录条数，然后根据记录条数动态生成分页按钮
	countAllPosition : function(){
		    var that = this;
			const url = '/api/positions/countAllPosition';
		 $.getJSON(url,function(data){
//		 	 console.log(this);
            that.positionsNum = data.res_body.data;
		    that.pages = Math.ceil(data.res_body.data/that.pageSize);
//		     console.log(that);
		  let html = `<li>
	                 <span class="previous" style="cursor:pointer;">
	                      &laquo;
	                    </span>
	                </li>`;
		 	  for(var i = 1; i<=that.pages;i++){
		          html+= `<li><a href="#">${i}</a></li>`
		            } 
		      html += `<li>
	                <span class="next" style="cursor:pointer;">
	                      &raquo;
	                    </span>
	               </li>`;
		  	 $('.btn_pages_body').html(html);
		  	 $("li:eq(1)",".btn_pages_body").addClass("active");
		  	
			});	
	},

	   // 点击向前翻页，向后翻页
     changePageByprevAndNext : function(e){
     	//向前或向后翻页，需要全局变量，将该全局变量作为一个属性赋给对象
      	 if($(e.target).hasClass("previous")){// 向前翻页
       	 	this.currentPage -= 1;
       	 	if(this.currentPage <= 1){
       	 		this.currentPage = 1;
       	 	}
       	 this.loadPositionByCurrentPage(this.currentPage,this.pageSize);
       	 }else if($(e.target).hasClass("next")){//向后翻页
       	 	this.currentPage += 1;
        if(this.currentPage >= this.pages){
            this.currentPage = this.pages;
       	 }
         this.loadPositionByCurrentPage(this.currentPage,this.pageSize);
       	 }
      },
         // 点击数字进行翻页
     changePageByNum : function(e){     	
       	  this.currentPage = $(e.target).text();
         this.loadPositionByCurrentPage(this.currentPage,this.pageSize);
          
      },
     // 根据页数从数据库分页查询数据
    loadPositionByCurrentPage: function(currentPage,pageSize){
     	 $.get('/api/positions/loadPositionByCurrentPage',{currentPage,pageSize},function(data){
     		 if(data.res_code===1){
     		 	var positions = data.res_body.data;
//   		 	console.log(positions);
//   		 	const html = template("position_row_template",{positions, index: (currentPage-1)*pageSize});
				const html = ejs.render(Position.rowTemplate, {positions, index: (currentPage-1)*pageSize});
     		    $(".position_body").html(html);
     		$(".btn_pages_body li:eq("+currentPage+")").addClass("active").siblings().removeClass("active");
     		 }
        	});
     },
     
     // 删除操作
     del_position : function(e){
     	var that = this;
     	let _id = $(e.target).parents("tr").children("td").eq(-2).children("a").data("id"),
            _logo = $(e.target).parents("tr").children("td").eq(1).children("img").attr("src");      
     	$.get('/api/positions/del_position',{_id,_logo},function(data){
             that.countAllPosition();
             if(that.positionsNum%that.pageSize==1){
             	that.currentPage = that.currentPage - 1;
              that.loadPositionByCurrentPage(that.currentPage,that.pageSize);
              }
              that.loadPositionByCurrentPage(that.currentPage,that.pageSize); 	
     	});

   },
   //点击修改 ,根据 id从数据库获得信息并填充到模态框，id和logo路径也添加到模态框，后续会用到，页面上做隐藏
   findPostionById : function(e){
   	  var _id = $(e.target).parent().children("a").data("id");
   		$.get("/api/positions/findPostionById",{_id}, function(data){
   	  const{_id,logo,name,company,exprience,position_type,address,salary}=data.res_body.data;
   			$("#m_id").val(_id);
   			$("#m_logo").val(logo);
   			$("#modify_2").val(name);
   			$("#modify_3").val(company);
   			$("#modify_4").val(exprience);
   			$("#modify_5").val(position_type);
   			$("#modify_6").val(address);
   			$("#modify_7").val(salary);
   		});
   },
   
  modify_position : function(){
   	// 点击确认修改，根据id对该条数据进行修改
   	   var that = this;
   $("#modifyPosition_submit").click(function(){
   	  	var formData = new FormData($(".modify_position_form")[0]);
		$.ajax({
			type:"post",
			url :"/api/positions/modifyPosition",
			data : formData,
			processData:false,
			contentType : false,
			success : function(data){
//				console.log(data);
				$("#modify").modal("hide");
		that.loadPositionByCurrentPage(that.currentPage,that.pageSize);
			}
		});
     });	 		 
   }
}

