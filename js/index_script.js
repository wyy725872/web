function getUrlParam(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    	if (r != null) return unescape(r[2]);
    	return null; //返回参数值
}
var userId=getUrlParam('userId');
var role=getUrlParam('role');


function setCookie(name, value, iDay)
{
  var oDate=new Date();
  oDate.setDate(oDate.getDate()+iDay); //用来设置过期时间用的，获取当前时间加上传进来的iDay就是过期时间
  document.cookie=name+'='+value+';expires='+oDate;
};
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
function removeCookie(name)
{
  setCookie(name, 1, -1); //-1就是告诉系统已经过期，系统就会立刻去删除cookie
};

setCookie('userId',userId,1);
setCookie('role',role,1);
role=getCookie('role');
userId=getCookie('userId');




var name=document.getElementById("different");
alert(userId);
alert(role);
if(userId){
	$.ajax({
		url: '/api/user',
		type: 'get',
		dataType: 'json',
		data:{
			'userId':userId
		}
		
	})
	.done(function(str) {
		var url = window.location;
		var pathname=window.location.pathname;
		var href=pathname;
		var new_href=href+'?userId='+userId+'&role='+role;
		var flag=1;
		if(new_href==document.URL&&flag==1){
			window.location=new_href;
			flag=0;
			
		}
		
		var header='<div class="topBox">'+
		'<strong>欢迎访问互金平台</strong>'+
		'<span>您好'+
		'</span>'+
		'</div>';
	$('.topBar').append(header);

		var nav='<div class="topBox"><strong><a href="index.html?userId='+userId+'&role='+role+'"></a></strong>'+
		'<ul><li class="first"><a href="index.html?userId='+userId+'&role='+role+'"class="hover">首页</a></li><li><a href="project.html?userId='+userId+'&role='+role+'">项目</a></li>'+
		'<li id="index5"><a href="self.html?userId='+userId+'&role='+role+'">我的账户</a></li>'+
		'<li><a href="#">关于我们</a></li></ul></div>'+
		'<div><img src="images/banner.jpg" height="350" width="125%"></div>';
	$('.topNav').append(nav);
	})
	.fail(function() {
		var header='<div class="topBox">'+
		'<strong>欢迎访问互金平台</strong>'+
		'<span>'+
			'<a href="login.html">立即登录</a>'+
			'<a href="sign_up.html" class="regist">快速注册</a>'+
		'</span>'+
	'</div>';
	$('.topBar').append(header);
		var nav='<div class="topBox"><strong><a href="index.html"></a></strong><ul><li class="first"><a href="index.html" class="hover">首页</a></li>'+
		'<li><a href="project.html">项目</a></li><li id="index5"><a href="self.html">我的账户</a></li>'+
		'<li><a href="#">关于我们</a></li></ul></div> '+
		'<div><img src="images/banner.jpg" height="350" width="125%"></div>';
	$('.topNav').append(nav);
	});
	
	
	
}else{
	var header='<div class="topBox">'+
		'<strong>欢迎访问互金平台</strong>'+
		'<span>'+
			'<a href="login.html">立即登录</a>'+
			'<a href="sign_up.html" class="regist">快速注册</a>'+
		'</span>'+
	'</div>';
	$('.topBar').append(header);
	var nav='<div class="topBox"><strong><a href="index.html?userId='+userId+'&role='+role+'"></a></strong>'+
		'<ul><li class="first"><a href="index.html?userId='+userId+'&role='+role+'"class="hover">首页</a></li><li><a href="project.html">项目</a></li>'+
		'<li id="index5"><a href="self.html?userId='+userId+'&role='+role+'">我的账户</a></li>'+
		'<li><a href="#">关于我们</a></li></ul></div>'+
		'<div><img src="images/banner.jpg" height="350" width="125%"></div>';
	$('.topNav').append(nav);
}
if(role==1){
	
	$('#different').attr('href','project.html?userId='+userId+'&role='+role);
}else{
	$('#different').attr('value','申请立项');
	$('#different').attr('href','borrow.html?userId='+userId+'&role='+role);

	var title=document.getElementById('pj_name');
	var applyAmount=document.getElementById('pj_money');
	var st_year=$('#st_year')
	
	var description=document.getElementById('pj_desp');
	var minBought=document.getElementById('min_b');
	var interset=document.getElementById('pj_in');
	var  pj_btn=document.getElementById('bor_btn');
	pj_btn.onclick=function(){
		var tags=$('#select_box option:selected') .val();
		var st_year=$('#st_year option:selected') .val();
		var st_month=$('#st_month option:selected') .val();
		var st_day=$('#st_day option:selected') .val();
		var beginDate=st_year+'-'+st_month+'-'+st_day;
	
		var et_year=$('#et_year option:selected') .val();
		var et_month=$('#et_month option:selected') .val();
		var et_day=$('#et_day option:selected') .val();
		var endDate=et_year+'-'+et_month+'-'+et_day;

	$.ajax({
		url: '/api/project/apply',
		type: 'get',
		dataType: 'json',
		data: {'userId': userId,
			'title':title.value,
			'description':description.value,
			'applyAmount':applyAmount.value,
			'tags':tags,
			'interset':interset.value,
			'minBought':minBought.value,
			'beginDate':beginDate.value,
			'endDate':endDate.value},
	})
	.done(function(str) {
		if(str.msg=="申请成功")
		alert('申请成功');
		//window.location="index.html?userId="+userId+'&role='+role;
	})
	.fail(function() {
		alert('申请失败');
	})
	.always(function() {
		console.log("complete");
	});
	}
	
	
}
$.ajax({
	url: '/api/project/list',
	type: 'get',
	dataType: 'json',
	data: {limit: 2,
		offset:0
		},
})
.done(function(str) {
	for(i=0;i<str.data.projectList.length;i++){
		var end_date = new Date(str.data.projectList[i].endDate);
		var start_date = new Date(str.data.projectList[i].beginDate);
		var num = (end_date-start_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
		var days = parseInt(Math.ceil(num));
		var list_content='<div class="hjs-list-info clearfix">'+
			'<div class="hjs-listinfo-left">'+
				'<div class="listBox-wrap clearfix">'+
					'<a target="_blank" href="detail.html?projectId='+str.data.projectList[i].projectId+'" class="listBox-title">'+str.data.projectList[i].title+'</a>'+
						'<span class="rates">'+str.data.projectList[i].tags+'</span>'+
				'</div>'+
				'<ul class="hjs-detail-list clearfix">'+
				'<li class="percent">'+
					'<p class="d-qxian"><b>'+str.data.projectList[i].interest+'</b>%</p>'+
					'<p class="describe">预期年化</p>'+
				'</li>'+
				'<li>'+
					'<p class="d-qxian"><b>'+days+'</b>天</p>'+
					'<p class="describe">期限</p>'+
				'</li>'+
				'<li class="last_line">'+
					'<p class="d-qxian"><b>'+str.data.projectList[i].minBought+'</b>元</p>'+
					'<p class="describe">起投金额</p>'+
				'</li>'+
				'</ul>'+
			'</div>'+
			'<div class="hjs-listinfo-right">'+
				'<p class="hjs-touzi">'+
					'<a href="detail.html?projectId='+str.data.projectList[i].projectId+'&userId='+userId+'" class="touzi-btn">立即投资</a>'+
				'</p>'+
			'</div>'+
			'</div>';
			
			
		$('#list_box').append(list_content);
		//$('#list_box').append(list_content2);
	}
	
	
	//console.log(str.data.projectList.length);
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

