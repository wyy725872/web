window.onload=function(){
/*显示验证码*/
	var img=document.createElement('img');
	var code_input=document.getElementById('code');

	$.ajax({
	url: '/api/login/getCaptcha',
	type: 'GET',
	dataType: 'json',
	})
	.done(function(result) {
		
		console.log(result.data);
		var img_box=document.getElementById('behind');
		
		img.src=result.data.captchaData;
		img.id='codeimg';
		img_box.appendChild(img);
		
		code_input.onchange=function(){
			if(code_input.value!=result.data.codeKey){
				alert('验证码输入错误');
				
			}
		}

		
		
	})

	/*看不清换一张*/
	img.onclick=function(){
		$.ajax({
			url: '/api/login/getCaptcha',
			type: 'GET',
			dataType: 'json',
		})
		.done(function(result) {
			img.src=result.data.captchaData;
		
			var code_input=document.getElementById('code');
			code_input.onchange=function(){
				if(code_input.value!==result.data.codeKey){
					alert('验证码输入错误');
				}
			}
		})
	}
	var user_in=document.getElementById('user_in');
	user_in.value='手机号码';
	user_in.onfocus=function(){
		if(user_in.value=='手机号码')
		user_in.value='';
	}
	user_in.onchange=function(){
		
		if(!(/^1[34578]\d{9}$/.test(user_in.value))){ 
        			alert("手机号码有误，请重填");  
       			return false; 
   		}
	}
	
	var user_pwd=document.getElementById('user_pwd');
	user_pwd.onchange=function(){
		if(user_pwd.value.length<6){
			alert('密码长度需大于6位！');
		}
	}

	var lg_button=document.getElementById('lg_button');
	var usenm=document.getElementById('user_in');
	lg_button.onclick=function(){
		var role=$('input:radio:checked').val();
		if(usenm.value&&user_pwd.value&&role){
			$.ajax({
				url: '/api/login',
				type: 'GET',
				dataType: 'json',
				data: {
					userPhone: usenm.value,
					password:user_pwd.value,
					code:code_input.value,
					role:role
				},
			})
			.success(function(str){
				if(str){
					var userId=str.data.userId;
					window.location.href='../index.html?userId='+userId+'&role='+role;
				}else{
					alert('登陆失败');
				}
			})
					.fail(function(){
						alert('登陆失败');
					});
			
		}else{
			alert('信息未填完整');
		}
	}		
}