window.onload=function(){
	function getUrlParam(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    	if (r != null) return unescape(r[2]);
    	return null; //返回参数值
	}
var userId=getUrlParam('userId');

var role=getUrlParam('role');
if (userId){
	$.ajax({
	url: '/api/user',
	type: 'GET',
	data:{
		'userId':userId,
	},
	dataType: 'json',
	})
.	success(function(str) {
		var phone=str.data.phone;
		var img='../images/header.jpg';
		var self_info_box=document.getElementById('self_info_box');
		self_info_box.innerHTML='<img src="'+img+'" width="90px" height="90px" style="float:left;margin-right:20px;"><div style="padding-top:25px;"><span class="clearfix" >'+phone+'，您好！</span></div><div class="clearfix"></div>';
		$('.account_ye').html('<i>￥</i><strong>'+str.data.balance+'</strong> ');
		$('.total').html('<i>￥</i><strong>'+str.data.total+'</strong> ');
		$('.hfax-yellow').html('<i>￥</i><strong>'+str.data.earnings+'</strong> ');
		$('.frozen').html('<i>￥</i><strong>'+str.data.frozen+'</strong> ');


	})
	.fail(function(){
		var self_info_box=document.getElementById('self_info_box');
		self_info_box.innerHTML='<p><a href="login.html">请登录</a><p>';
	});

/*充值提现*/
	var save=document.getElementById('save_money');
	var tixian=document.getElementById('tixian_money');
	var money_box=document.getElementById('money_box');
	var yes=document.getElementById('yes');
	var cancel=document.getElementById('cancel');
	save.onclick=function(){
	
		money_box.style.display='block';
		yes.onclick=function(){
			var money_value=document.getElementById('send_money').value;
			if(money_value){
				$.ajax({
					url: '/api/user/updateInfo',
					type: 'GET',
					dataType: 'json',
					data: {
						'userId':userId,
						'balance':money_value,
						'email':'aa@aa.com'
						},
				})
				.success(function(str){
					if(str.msg=='更新成功'){
						alert('修改成功！');
						money_box.style.display='none';
						$.ajax({
							url: '/api/user',
							type: 'GET',
							data:{
								'userId':userId,
							},
							dataType: 'json',
						})
						.success(function(str){
							$('.account_ye').html('<i>￥</i><strong>'+str.data.balance+'</strong> ');
							$('.total').html('<i>￥</i><strong>'+str.data.total+'</strong> ');
						})
					
				}else{
					alert('该用户不存在！');
				}
			})
			.fail(function () {
				alert('修改失败！');
				money_box.style.display='none';
           		 });
		}else{
			alert('请输入金额');
		}
		
		};
		cancel.onclick=function(){
			money_box.style.display='none';
		}

	}

	tixian.onclick=function(){
		money_box.style.display='block';
		yes.onclick=function(){
			var money_value=document.getElementById('send_money').value;
			if(money_value){
				$.ajax({
					url: '/api/user/updateInfo',
					type: 'GET',
					dataType: 'json',
					data: {
						'userId':userId,
						'balance':-money_value,
						'email':'aa@aa.com'
						},
					})
				.success(function(str){
					if(str.msg="更新成功"){
						alert('修改成功！');
					money_box.style.display='none';
					$.ajax({
							url: '/api/user',
							type: 'GET',
							data:{
								'userId':userId,
							},
							dataType: 'json',
						})
						.success(function(str){
							$('.account_ye').html('<i>￥</i><strong>'+str.data.balance+'</strong> ');
							$('.total').html('<i>￥</i><strong>'+str.data.total+'</strong> ');
						})
				
				}})
				.fail(function () {
					alert('修改失败！');
					money_box.style.display='none';
          			  });
			}else{
				alert('请输入金额');
			}
		
			};
			cancel.onclick=function(){
			money_box.style.display='none';
		}

	}

/*实名认证*/
var user_id=document.getElementById('user_id');
var user_name=document.getElementById('user_name');
var user_address=document.getElementById('user_address');
var user_transpassword=document.getElementById('user_transpassword');
var user_rtpwd=document.getElementById('user_rtpwd');
var up_button=document.getElementById('up_button');
user_transpassword.onblur=function(){
		if(user_transpassword.value.length<6){
			alert('密码长度需大于6位！');
		}else{
			user_rtpwd.onblur=function(){
			if(user_rtpwd.value!=user_transpassword.value)
				alert("两次输入密码不一致，请重新输入");
			}
		}
	}
up_button.onclick=function(){
	if(user_transpassword.value&&user_rtpwd.value&&user_id.value&&user_name.value&&user_address.value){
			
			$.ajax({
				url: '/api/user/updateInfo',
				type: 'GET',
				dataType: 'json',
				data: {
					userId:userId,
					idnum:user_id.value,
					realname:user_name.value,
					address:user_address.value,
					transpwd:user_transpassword.value,
					},
			})
			.success(function(str){
				if(str.msg=="更新成功"){
					alert('认证成功！');
				}else{
					alert('认证失败！');
				}
				
			})
			.fail(function () {
				alert('修改失败！');
            });
			}else{
				alert('信息未填完整');
			}
		}	


/*修改密码*/
var user_pwd=document.getElementById('user_pwd');
	var user_rpwd=document.getElementById('user_rpwd');
	user_pwd.onblur=function(){
		if(user_pwd.value.length<6){
			alert('密码长度需大于6位！');
		}else{
			user_rpwd.onblur=function(){
			if(user_rpwd.value!=user_pwd.value)
				alert("两次输入密码不一致，请重新输入");
			}
		}
	}


var lg_button=document.getElementById('lg_button');
	lg_button.onclick=function(){
		if(user_pwd.value&&user_rpwd.value){
			
			$.ajax({
				url: '/api/user/updateInfo',
				type: 'GET',
				dataType: 'json',
				data: {
					userId:userId,
					newPassword:user_pwd.value,
					},
			})
			.success(function(str){
				if(str.msg=='更新成功')
				alert('修改成功！');
			})
			.fail(function () {
				alert('修改失败！');
            });
			}else{
				alert('信息未填完整');
			}
		}	
	$('#self').attr('href','self.html?userId='+userId);
	$('#fix').attr('href','fix.html?userId='+userId);
	$('#real').attr('href','real.html?userId='+userId);
	$('#money').attr('href','money.html?userId='+userId);

}else{
	var self_info_box=document.getElementById('self_info_box');
	self_info_box.innerHTML='<p><a href="login.html">请登录</a><p>';
}

}

