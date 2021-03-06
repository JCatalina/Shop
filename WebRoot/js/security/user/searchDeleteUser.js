$(document).ready(function(){
	/* B 定义该页面公用的函数*/
	//1、判断select的option是否被选择
	function checkSelectId(){
		/* 判断是select的option是否选择*/
		if($.trim($("#selectId  option:selected").val())=="-1"){
			window.alert("请选择查询方式！");
			$("#selectId").focus();
			return false;
		}else{
			/* 若allRole，置queryItems不可用 */
			if($.trim($("#selectId  option:selected").val())=="allUser"){
				$("#queryItems").attr("value","");
				$("#queryItems").attr("disabled","disabled");
				return true;
			}else{
				//恢复queryItems可用
				$("#queryItems").attr("disabled",false);
				return true;
			}
		}
		
	}
	//2、判断查询条件是否为空
	function checkQueryItems(){
		if($.trim($("#queryItems").val())==""){
			//window.alert("当查询方式为权限名称或角色描述时，查询条件不能为空！");
			window.alert("查询条件不能为空！");
			$("#queryItems").focus();
			return false;
		}else{
			return true;
		}
	}
	//3、根据selectId的option的选择，判断查询条件是否正确
	function checkQueryItemsBySelectId(){
		//selet的option是否
		var result0 = checkSelectId();
		if(!result0){
			return false;
		}
		if($.trim($("#selectId  option:selected").val())=="account"){
			//选择了roleName
			var result = checkQueryItems();
			if(!result){
				return false;
			}else{
				//权限名称(roleName)不为空
				/*判断权限名是否合法*/
				var reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!reg.test($.trim($("#queryItems").val()))){
					window.alert("账户名——邮箱不正确！");
					$("#queryItems").focus();
					return false;
				}else{
					return true;
				}
			}
		}
		if($.trim($("#selectId  option:selected").val())=="description"){
			//选择了description
			
		 	//判断角色名称(roleName)是否为空
			var result = checkQueryItems();
			if(!result){
				return false;
			}
			return true;
		}
		if($.trim($("#selectId  option:selected").val())=="allUser"){
			return true;
		}
			
	}

	//4、防止重复提交函数
	function doSubmit(){
		if(formSubmitFlag == false){
			formSubmitFlag = true;//表单提交后，让标识符设置为true
			return true;//让表单正常提交
		}else{
			window.alert("该表单已经提交过！");
			return false;//表单已经提交过，不让该表单再次提交；
		}
	}
	
	/* E 公共函数*/
	
	//确认删除以及删除事件
    /* confirm_del = function(authorityId){
    	if(confirm("确定要删除此权限吗？")){
            $.ajax({
              type:"POST",
              url:"searchDeleteAuthorityAction_!delete",
              data:"authorityId="+authorityId+"&selectId="+$.trim($("#selectId  option:selected").val())+"&queryItems="+$.trim($("#queryItems").val()),
              success:function(result){
            	  //search(); 
            	  //window.location.reload(true);
            	  //$('#mysubmit').trigger("click");
              }
            });
        }
    }  */
	
	function doDeleteUser(userId){
		var url= "searchDeleteUserAction_!delete.action?userId="+userId+"&selectId="+$.trim($("#selectId  option:selected").val())+"&queryItems="+$.trim($("#queryItems").val());              
	       window.location.href=url;
	}
	
     confirm_del = function (userId){
    	 
    	 //donglei
    	 //confirm("确定要删除此用户吗？",doDeleteUser,null,userId);
    	 
	    if(confirm("确定要删除此用户吗？"))
	    {
	   	
	       var url= "searchDeleteUserAction_!delete.action?userId="+userId+"&selectId="+$.trim($("#selectId  option:selected").val())+"&queryItems="+$.trim($("#queryItems").val());              
	       window.location.href=url;
	       return true;
	    }else{
			return false;
		}
		
	}

	
	/*判断select的option是否被选择   */
	$("#selectId").change(checkSelectId);
	/* 判断queryItems是否符合规范 */
	$("#queryItems").change(checkQueryItemsBySelectId);
	/*if($("table tbody").children().length > 0){
		var obj = $(this).parent().parent().children().eq(0).text();
		/* 删除链接绑定删除事件
		$(".roleDelete").bind("click",obj,confirm_del(event));
		return true;
	}*/

	var formSubmitFlag = false;//表单是否提交标识符，默认为false,即没有提交
	
	
	/* 判断是否是queryItems不可用 */
	$("#queryItems").focus(checkSelectId);
	
	/* 提交表单判断 */
	$("#mysubmit").bind("click",function(){
		//1、判断select的option是否被选择
		var result1 = checkSelectId();
		if(!result1){
			return false;
		}
		//2、判断queryItems是否符合规范
		var result2 = checkQueryItemsBySelectId();
		if(!result2){
			return false;
		}
		/* if($.trim($("#currentPage").val())==""||$.trim($("#pageSize").val())==""){
			search();
		} */
		
		var resultSearch = search();
		if(!resultSearch){
			return false;
		}
		//4、判断表单是否已提交
		var resultDoSubmit = doSubmit();
		if(!resultDoSubmit){
			//禁止表单提交
			return false;
		}
		return true;
	});
	
	//返回主页
	$("#fanhuibutton").bind("click",function(){
		$("#fanhuiform").attr("action","jumpToIndexAdmin.action");
		$("#fanhuiform").submit();
	});
	
});


var confirm_del;

function pageGo(){
	var selectId = $.trim($("#selectId  option:selected").val());
	var queryItems = $.trim($("#queryItems").val());
	var page_currentPage = $.trim($("#currentPage").val());
	var page_pageSize = $.trim($("#pageSize").val());
	var url= "searchDeleteUserAction_!search.action?selectId="+selectId+
											"&queryItems="+queryItems+
											"&page.currentPage="+page_currentPage+
											"&page.pageSize="+page_pageSize;
	window.location.href=url;
	return true;
}

