window.onload=function(){
	var user_in=document.getElementById('user_in');
	user_in.value='手机号码';
	user_in.onfocus=function(){
		if(user_in.value=='手机号码')
		user_in.value='';
	}
	user_in.onblur=function(){
		
		if(!(/^1[34578]\d{9}$/.test(user_in.value))){ 
        			alert("手机号码有误，请重填");  
       			return false; 
   		}else{
   			var use=user_in.value;
   		}
		
		$.ajax({
			url: '/path/to/file',
			type: 'default GET (Other values: POST)',
			dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			data: {param1: 'value1'},
		})
		.done(function(str) {
			var arr=JSON.parse(str);
			if(use==arr.user)
				alert("该号码已被注册！");
			else{
				alert("可使用");
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}
	
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
		if(user_in.value&&user_pwd.value&&user_rpwd.value){
			$.ajax({
				url: '/path/to/file',
				type: 'default GET (Other values: POST)',
				dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				data: {param1: 'value1'},
				})
				.done(function() {
					window.location.href="index.html";
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
			});
		}else{
			alert('信息未填完整');
		}
	}	
		
			
	/*增加验证码检测*/

}