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
		ajax('json/login_json.js',function(str){
			var arr=JSON.parse(str);
			if(use!=arr.user)
				alert("该号码还未注册！");
		},function(){
			alert("失败");
		})
	}
	
	var user_pwd=document.getElementById('user_pwd');
	user_pwd.onblur=function(){
		if(user_pwd.value.length<6){
			alert('密码长度需大于6位！');
		}
	}

	var lg_button=document.getElementById('lg_button');
	lg_button.onclick=function(){
		if(user_in.value&&user_pwd.value){
			$.ajax({
				url: '/path/to/file',
				type: 'default GET (Other values: POST)',
				dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
				data: {param1: 'value1'},
				})
				.done(function(str) {
					var arr=JSON.parse(str);
					if(arr.user==usenm){
						if(arr.password==usepwd){
							alert('登录成功！欢迎您 '+usenm);
							window.location.href='index.html';
						}else
							alert("密码错误");
					}else
						alert("该用户没有注册！");
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