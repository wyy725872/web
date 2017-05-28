function getUrlParam(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    	if (r != null) return unescape(r[2]);
    	return null; //返回参数值
	}
var projectId=getUrlParam('projectId');
var userId=getUrlParam('userId');
$('#index5 a').attr('href','self.html?userId='+userId+''); 

$.ajax({
	url: '/api/project/detail',
	type: 'get',
	dataType: 'json',
	data: {'projectId':projectId
		},
})
.success(function(str){
	$('#title_name').html(str.data.title);
	$('.nianhua').html(str.data.interest);
	$('.xm_qixian').html(str.data.days);
	$('.guimo').html(str.data.applyAmount);
	$('.start_date').html(str.data.beginDate);
	$('.end_date').html(str.data.endDate);
	$('.return_style').html(str.data.huankuanType);
	var amount=parseInt(str.data.applyAmount);
	var bought=parseInt(str.data.bought);
	var jindu=parseInt(bought/amount);
	$('.jindu').html(toPercent(jindu));
	$('.yue').html(amount-bought);
	var min=parseInt(str.data.minBought);
	var btn=document.getElementById('touzi_btn');
	btn.onclick=function(){
		if(userId){
		var tzMoney=document.getElementById('tzMoney');
		if(tzMoney.value){
			if(tzMoney.value<min){
			alert('投资金额不能小于'+min);
			}else{
				$.ajax({
					url: '/api/project/touzi',
					type: 'get',
					dataType: 'json',
					data: {'userId': userId,
						'projectId':projectId,
						'tzMoney':tzMoney.value},
				})
				.done(function(str) {
					if(str.msg=="投资成功"){
						alert('投资成功');
						$.ajax({
							url: '/api/project/detail',
							type: 'get',
							dataType: 'json',
							data: {'projectId':projectId
								},
							})
						.success(function(str){
							var amount=parseInt(str.data.applyAmount);
							var bought=parseInt(str.data.bought);
							var jindu=parseInt(bought/amount);
							$('.jindu').html(toPercent(jindu));
							$('.yue').html(amount-bought);
						});
					}else{
						alert('投资失败');
					}
					
				})
				.fail(function() {
					alert('投资失败');
				})
				.always(function() {
					console.log("complete");
				});	
		}
		
				
			}else{
			alert('请输入投资金额');
		}
	}else{
		alert('请先登录');
		window.location='login.html';
	}
		
		

	}
})
function toPercent(point){
    var str=Number(point*100).toFixed(1);
    str+="%";
    return str;
}