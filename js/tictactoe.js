;(function(window,document){  	
	var g = function(id){
		return document.getElementById(id);
	};
	var wrapper = g('wrapper'),
		td = wrapper.getElementsByTagName('td'),
		line = g("line");
		
	var Tictactoe = function (options) {
		this.options = options; //配置
		this.chooseMode = this.options.chooseMode; //模式选择
		this.emptyArr = [0,1,2,3,4,5,6,7,8]; //可用区域
		this.order = this.options.order; //先后手
		this.robotModel = (this.order === 'robotTurn') ? type = 1 : type = 2;
		this.o_or_x = 'o'; //ox转换
		this.count = 0; //落子计数
		this.model = [[0,0,0],[0,0,0],[0,0,0]]; //数据模型,下o为1，下x为2
		this.init();
	}
	Tictactoe.prototype = {
		constructor:Tictactoe,
		//初始化
		init:function(){
			var self = this,
				tdArr = [].slice.call(td);		
			for(var i = 0; i < 9; i++){
				td[i].onclick = 
					(function(i){
						return function(){
							self.draw(this,i);
						}
				})(i);
			}
			if(this.chooseMode === 'single' && this.order === 'robotTurn'){
				this.robot();
			}
		},
		//机器人
		robot:function(){
			//判断是否能赢
			if(this.willWin(this.robotModel)){
				//console.log('要赢');
				return;
			};
			//判断对方是否要赢
			if(this.willWin(3-this.robotModel)){
				//console.log('要输');
				return;
			};
			//判断中心能不能下
			if(this.model[1][1] === 0){
				//console.log('下中间');
				this.draw(td[4],4);
				return;
			}
			//角落优先
			if(this.model[0][0] === 0){
				//console.log('下左上');
				this.draw(td[0],0);
				return;
			}
			if(this.model[0][2] === 0){
				//console.log('下右上');
				this.draw(td[2],2);
				return;
			}

			if(this.model[2][0] === 0){
				//console.log('下左下');
				this.draw(td[6],6);
				return;
			}

			if(this.model[2][2] === 0){
				//console.log('下又上');
				this.draw(td[8],8);
				return;
			}
			//随便下
			this.draw(td[this.emptyArr[0]],this.emptyArr[0]);
		},
		//是否要赢
		willWin:function(type){
			for(var i = 0; i<this.emptyArr.length; i++){
				var count = 0;
				var row = Math.floor(this.emptyArr[i]/3), column = this.emptyArr[i]%3;
				for(var j = 0; j < 3; j++){
					if(this.model[row][j] === type){
						count++;
					}
				}
				if(count === 2){
					this.draw(td[this.emptyArr[i]],this.emptyArr[i]);
					//console.log('行');
					return true;
				}
				count = 0;
				for(var k = 0; k < 3; k++){
					if(this.model[k][column] === type){
						count++;
					}
				}
				if(count === 2){
					this.draw(td[this.emptyArr[i]],this.emptyArr[i]);
					//console.log('列');
					return true;
				}
				count = 0;
				if(row === column){
					if(this.model[0][0] === type){
						count++;
					}
					if(this.model[1][1] === type){
						count++;
					}
					if(this.model[2][2] === type){
						count++;
					}
				}
				if(count === 2){
					this.draw(td[this.emptyArr[i]],this.emptyArr[i]);
					//console.log('\\');
					return true;
				}
				count = 0;
				if(row + column === 2){
					if(this.model[0][2] === type){
						count++;
					}
					if(this.model[1][1] === type){
						count++;
					}
					if(this.model[2][0] === type){
						count++;
					}
				}
				if(count === 2){
					this.draw(td[this.emptyArr[i]],this.emptyArr[i]);
					//console.log('/');
					return true;
				}
			}
		},

		//描绘
		draw:function(element,index){
			var row = Math.floor(index/3), column = index%3;
			if(this.o_or_x === 'o'){
				element.innerHTML = "o";
				td[index].style.color = 'green';
				this.model[row][column] = 1;
				this.o_or_x = 'x';
			}else{
				element.innerHTML = "x";
				td[index].style.color = 'red';
				this.model[row][column] = 2;
				this.o_or_x = 'o';
			}
			if(this.chooseMode === 'single'){
				// if(this.order === 'robotTurn'){
				// 	this.order = 'yourTurn';
				// }else{
				//     this.order = 'robotTurn';
				// }
				(this.order === 'robotTurn')?this.order = 'yourTurn':this.order = 'robotTurn';  
			}

			element.onclick = null;
			for(var i = 0; i<this.emptyArr.length; i++){
				if(this.emptyArr[i] === index){
					this.emptyArr.splice(i,1);
					break;
				}					
			}
			
			this.count++;

			if(!this.judge(row,column)){
				if(this.chooseMode === 'single' && this.order === 'robotTurn'){
					this.robot();
				}
			};
		},
		//判断
		judge:function(row,column){
			var self = this, 
				model = this.model,
				messageArr = [];
				if(this.chooseMode === 'single'){
					if(this.options.order === 'robotTurn'){
						messageArr = ['你赢了~','你输了~'];
					}else {					
						messageArr = ['你输了~','你赢了~'];
					}
				}else{
					messageArr = ['X赢了~','O赢了~'];
				};
			var	message = messageArr[Number(this.o_or_x === 'x')];
				//drawLine = this.drawLine;
			//判断行
			if(model[row][0] === model[row][1] && model[row][0] === model[row][2]){
				this.drawLine('row',row);
			 	this.endingDeal(message);
				return true;
			}

			//判断列
			if(model[0][column] === model[1][column] && model[0][column] === model[2][column]){
				this.drawLine('column',column);
			 	this.endingDeal(message);
				return true;
			}

			//判断\
			if(row === column && model[0][0] === model[1][1] && model[0][0] === model[2][2]){
				this.drawLine('\\');
				this.endingDeal(message);
				return true;
			}
			//判断/
			if(row+column === 2 && model[0][2] === model[1][1] && model[0][2] === model[2][0]){
				this.drawLine('/');
				this.endingDeal(message);
				return true;
			}

			//满格
			if(this.count === 9){					
				this.endingDeal('平手~');
				return true;
			}
			return false;
			
		},

		//游戏结束处理
		endingDeal:function(message){
		  var self = this;
		  for (var i = 0,l = this.emptyArr.length; i < l; i++) {
					td[this.emptyArr[i]].onclick = null;
		  } 
		  setTimeout(function(){
		  		maskMenu({
					title:message,
					button:[{
						content:'再玩一次',
						bindClick:function(){
							
							self.restart();	
						}
					},{
						content:'回主菜单',
						bindClick:function(){
							self.clean();
							chooseModel();
						}
					}]
				});
		  },1000);						
		},
		//画线
		drawLine:function(type,index){
			switch (type) {
				case 'row':
					line.style.transform = "translateY("+(index-1)*100+"px)";
					break;
				case 'column':
					line.style.transform = "translateX("+(index-1)*100+"px) rotate(90deg)"; 
					break;
				case '\\':
					line.style.transform = "rotate(45deg)"; 
					break;
				case '/':
					line.style.transform = "rotate(-45deg)"; 
					break;
				default:
					break;
			};
			line.style.display = "block";
			
		},
		//给出结果
		// alertResult:function(message){
		// 	for (var i = 0; i < 9; i++) {
		// 		td[i].onclick = null;
		// 	}
		// 	setTimeout(function(){
		// 		alert(message);
		// 	},200);
		// },
		//重来
		restart:function(){
			var self = this;
			//setTimeout(function(){
				this.clean();
				new Tictactoe(self.options);
			//},300);				
		},
		//重玩清除
		clean:function(){
			for (var i = 0; i < 9; i++) {
					td[i].innerHTML = '';
			}					
			line.style.display = 'none';
		}
	}
	window.Tictactoe = Tictactoe;
})(window,document);