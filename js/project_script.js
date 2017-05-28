function getUrlParam(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    	if (r != null) return unescape(r[2]);
    	return null; //返回参数值
	}
var userId=getUrlParam('userId');

$.ajax({
	url: '/api/project/list',
	type: 'get',
	dataType: 'json',
	data: {limit: 4,
		offset:0
		},
})
.success(function(str){
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
					'<a href="detail.html?projectId='+str.data.projectList[i].projectId+'&userId="'+userId+' class="touzi-btn">立即投资</a>'+
				'</p>'+
			'</div>'+
			'</div>';
			
			
		$('#list_box').append(list_content);
		//$('#list_box').append(list_content2);
	}
})