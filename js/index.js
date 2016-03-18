

$(function(){
	var s = '';
	var num=0;
	for(var i = 0 ; i < 20; i++){
		for(var j = 0; j < 20; j++ ){
			var id = i+'_'+j;
			s += '<div id="'+id+'" class="block"></div>'
		}
	}
	$('#sence').html(s);
	var snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
	var data =  {'0_0':true,'0_1':true,'0_2':true};
	var huashe  = function(){
		$.each(snake,function(index,value){
			$('#'+ value.x + '_'+ value.y).css({backgroundImage:'url(./images/she.png)'});
		})
	}
	huashe();

	var dropFood = function() {
		var x = Math.floor(Math.random()*20);		
		var y = Math.floor(Math.random()*20);		
		while( data[x+'_'+y] ){
			x = Math.floor(Math.random()*20);		
			y = Math.floor(Math.random()*20);		
		}
		$('#'+x+'_'+y).css({backgroundImage:'url(./images/food.png)'});
		return {x:x,y:y};
	}	
	var food = dropFood();
	var fangxiang = 39;
	var move = function () {
		var oldTou = snake[snake.length-1];
		if(fangxiang == 39){
			var newTou = {x:oldTou.x,y:oldTou.y+1};
			// $('.block').text('');
			// $('#'+ newTou.x + '_'+ newTou.y).text('tou');
		}
		if(fangxiang == 40 ){
			var newTou = {x:oldTou.x+1,y:oldTou.y};
			// $('.block').text('');
			// $('#'+ newTou.x + '_'+ newTou.y).text('tou');
		}
		if(fangxiang == 37){
			var newTou = {x:oldTou.x,y:oldTou.y-1};
			// $('.block').text('');
			// $('#'+ newTou.x + '_'+ newTou.y).text('tou');
		}
		if(fangxiang == 38){
			var newTou = {x:oldTou.x-1,y:oldTou.y};
			// $('.block').text('');
			// $('#'+ newTou.x + '_'+ newTou.y).text('tou');
		}
		if(newTou.x<0||newTou.y<0||newTou.x>19||newTou.y>19||data[newTou.x+'_'+newTou.y]){
			$('.tips').css({display:'block'});
			$('.zailai').css({display:'block'});
			$('.hao').css({display:'block'});
			$('.buhao').css({display:'block'});
			clearInterval(timerId);
			return;
		}
		if(newTou.x == food.x && newTou.y == food.y){
			food = dropFood();
			num+=1;
			$('.num').text(num);
		}else{
			var weiba = snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({background:'none'});
		}
		snake.push(newTou)
		data[newTou.x + '_' + newTou.y] = true;
		$('#'+newTou.x + '_' + newTou.y).css({backgroundImage:'url(./images/she.png)'})
	}	
	var timerId;
	$('.start').click(function()
	{
		timerId = setInterval(move,150);
		
		$(this).css({display:'none'})
	})
	

	$(document).keydown(function(e){
		if( Math.abs(e.keyCode - fangxiang) == 2 ){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40 ) ){
			return;
		}
	    fangxiang = e.keyCode;
	})	
	$('.hao,.chongxinkaishi').click(function()
	{	
		$('.tips').css({display:'none'});
		$('.zailai').css({display:'none'});
		$('.hao').css({display:'none'});
		$('.buhao').css({display:'none'});
		$('.block').css({background:'none'});
		$('.chongxinkaishi').css({display:'none'});
		snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
		data =  {'0_0':true,'0_1':true,'0_2':true};
		huashe();
		num=0;
		$('.num').text(num);
		food = dropFood();
		fangxiang = 39;
		timerId = setInterval(move,150);
	})
	$('.buhao').click(function()
	{
		$('.tips').css({display:'none'});
		$('.zailai').css({display:'none'});
		$('.hao').css({display:'none'});
		$('.buhao').css({display:'none'});
		$('.chongxinkaishi').css({display:'block'});
	})


	touch.on( '#sence' ,'swipe', function(e){
        e.preventDefault();
        if(e.direction){
          direct =  e.direction;
        }
      })

})