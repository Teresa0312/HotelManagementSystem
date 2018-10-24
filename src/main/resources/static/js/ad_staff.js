var pageNum=1;
var pageSize=8;

$(document).ready(function(){
	getStaffList();
	$("#pre").on('click',function(){
		getPre();
	});
	$("#next").on('click',function(){
		getNext();
	});
	$("#addUserBtn").on('click',function(){
		addUser();
	})

})


var list;
function getStaffList(){
	$.ajax({
		type:"post",
		url:"../user/getAllUser.do",
		dataType:"JSON",
		data:{
			"pageNum":pageNum,
			"pageSize":pageSize,
			"power":"2"
		},
		success:function(data){
			var power=" ";
			var htmlStr=" ";
			var btnStr=" ";
			list=data.list;
			var l=0;
			$("#pre").css("display","block");
			$("#next").css("display","block");
			$("#staffList").empty();
			$("#staffList").append("<tr><th>账号</th><th>员工号</th><th>姓名</th><th>年龄</th><th>职位</th><th>联系方式</th><th>操作</th></tr>")
			for(i in list){
				btnStr="<input type=\"button\" id=\"delUser\" data-userid=\""+list[i].userid+"\" class=\"btn btn-danger\" value=\"删除\"/>"
				htmlStr="<tr data-userid=\""+list[i].userid+"\"><td>"+list[i].useraccount+"</td><td>"+list[i].idnumber+"</td><td>"+list[i].username+"</td><td>"+list[i].age+"</td><td>"+power+"</td><td>"+list[i].phonenumber+"</td><td>"+btnStr+"</td></tr>";
				$("#staffList").append(htmlStr);
				console.log(htmlStr);
				l++;
			}
			if(pageNum=="1") $("#pre").css("display","none");
			if(pageSize>l) $("#next").css("display","none");
			btnOn();

		},
		error:function(){
			alert("获取员工列表发生错误")
		}
	})
}

function btnOn(){
	$("input").filter("#delUser").on('click',function(event){
		delUser(event);
	});
}

function getPre(){
	pageNum=pageNum-1;
	getStaffList();
}

function getNext(){
	pageNum=pageNum+1;
	getStaffList();
	
}

function delUser(event){
	var userid=$(event.target).data("userid");
	$.ajax({
		type:"POST",
		url:"../user/delUser.do",
		dataType:"JSON",
		data:{
			"userid":userid
		},
		success:function(data){
			if(data.code==0){
				alert("修改成功");
				getStaffList();
			}
			else
				alert("修改失败")
		},
		error:function(){
			alert("修改信息出现错误");
		}
	})

}

function addUser(){
	$.ajax({
		type:"POST",
		url:"../user/addUser.do",
		dataType:"JSON",
		data:{
			"useraccount":$("#inputAccount").val(),
			"password":$("#inputPwd").val(),
			"power":"2"
		},
		success:function(data){
			if(data.code==0){
				alert("添加成功");
				window.location.reload();
			}
			else
				alert("添加失败")
		},
		error:function(){
			alert("添加用户出现错误");
		}
	})
}