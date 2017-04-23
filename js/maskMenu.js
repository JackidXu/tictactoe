var maskMenu = function (options) {
	//字符串转dom元素
	function parseDom(arg) {
	　　 var objE = document.createElement("div");
	　　 objE.innerHTML = arg;
	　　 return objE.childNodes;
	};

	var title = options.title || "请选择",
		buttonArr = options.button,
		buttonTpl = '';
		for (var i = 0,l = buttonArr.length; i < l; i++) {
			buttonTpl += "<button>"+buttonArr[i].content+"</button>"; 
		}
		
	var tpl ='<div class="maskMenuWrapper" id="maskMenuWrapper">'
				+'<div class="maskMenu" id="maskMenu">'
					+'<h1>'+title+'</h1>'
					+buttonTpl
				+'</div>'
			+'</div>';
	document.body.appendChild(parseDom(tpl)[0]);
	var maskMenuWrapper = document.getElementById('maskMenuWrapper'),
		buttonList = maskMenuWrapper.getElementsByTagName('button');
	//console.log(buttonList);
	(function (){
		for (var i = 0,l = buttonList.length; i < l; i++) {
			buttonList[i].onclick = (function(i){
				return function(){
					//console.log(i);
					maskMenuWrapper.parentNode.removeChild(maskMenuWrapper);
					buttonArr[i].bindClick();
				}				
			})(i)
		}
	})();

}