+function($,document,win){
	
	$(function(){
		
		// 相对路径
		var pathname = win.parent.location.pathname;
		var fromUrl = pathname.substring(0, pathname.lastIndexOf('/') + 1);
		
		var pathname1 = win.parent.location.pathname;
		var fromUrl1 = pathname.substring(0, pathname.lastIndexOf('/admin') + 1);
		
		$.ajax({
			url: fromUrl1 + 'admin/function',
			success:function(funInfos){
				
				// 当前页面的权限配置
				var funInfo = null;
				for(var i = 0; i < funInfos.allFuns.length; i++){
					var url = funInfos.allFuns[i].url;
					if(!url) {
						continue;
					}
					// 相对路径转绝对路径
					if(url.substr(0,1) != '/') {
						url = fromUrl + url;
					}
					if(url == document.location.pathname){
						funInfo = funInfos.allFuns[i];
						break;
					}
				}
				
				// 当前页面不进行拦截
				if(!funInfo) {
					return;
				}
				
				// 页面按钮
				var btns = $('.funciton').find('input');
				
				for(var i = 0; i < btns.length; i++){
					var control = false;
					var hide = true; // 默认隐藏
					var btn = $(btns[i]);
					
					// 是否控制该按钮
					for(var j = 0; j < funInfos.allFuns.length; j++){
						/*
						if(funInfos.allFuns[j].id == funInfo.id && btn.attr('id') == funInfos.allFuns[j].url){
							control = true;
							break;
						}*/
						if(btn.attr('id') == funInfos.allFuns[j].url){
							control = true;
							break;
						}
					}
					
					// 判断是否有权限
					for(var j = 0; j < funInfos.menus.length; j++){
						if(btn.attr('id') == funInfos.menus[j].url){
							hide = false;
							break;
						}
					}
					
					// 隐藏按钮
					if(control && hide){btn.remove();}
				}
			}
		});
		
	});
	
}(jQuery,document,window)