var UserisFocus = false;
$(document).ready(function(){
	var day = moment().format('D');
	var weekday = moment().format('dddd');
	var month = moment().format('MMMM');
	var date = weekday+", "+month+" "+day;
	var setTime = function(){
		var time = moment().format('HH') + ":" + moment().format('mm');
		$("#time").html(time);
	};
	setTime();
	setInterval(function(){setTime()}, 1000);
	$("#date").html(date);
	optimize();
	var dropped=false;
	var mouseY;
	var moveCover = function(to){
		if(dropped==false){
			if(to=="top"){
				$("#loginCover").animate({top:"-110%"});
			}
			else if(to=="bottom"){
				$("#loginCover").animate({top:"0%"});
			}
			dropped==true;
			setTimeout(function(){
				dropped==false;
			},750);
		}
	}
	$(function() {
		$("#loginCover").draggable({
			axis:"y",
			containment:[-window.innerWidth*1.2,-window.innerHeight*1.2,0,0],
			stop:function(e){
				var elTop = $("#loginCover").position().top;
				var area = window.innerHeight*-0.3;
				if(area<elTop){moveCover("bottom");}
				else{moveCover("top");}
			}
		});
		$(".draggable").disableSelection();
	});
	$("#loginCover").mousedown(function(e){
		mouseY = e.clientY;
	});
	$("#loginCover").mouseup(function(e){
		if(mouseY==e.clientY) moveCover("top");
	});
	var images=['eye_active.jpg','eye_hover.jpg'];
	for (var i = images.length - 1; i >= 0; i--) {
		var image = '<img src="'+ "images/" + images[i] +'">';
		$(image).load();
	};
 	$("#submit").click(function(){
		if($("#pass").val()!="" && $("#email").val()!=""){
			setTimeout(function(){
				$("#loginForm").submit();
			}, 300);
		}
		else{
			if($("#email").val()==""){
				$("#email").css("outline", "1px solid rgb(235, 46, 46)");
			}
			if($("#pass").val()==""){
				$("#pass").css("outline", "1px solid rgb(235, 46, 46)");
			}
		}
	});
	$("#reauth").click(function(){
			window.location = "/start/login";
	}); 
});
var getEl = function(el){return document.getElementById(el);}
var optimize = function(){
	$("#loginFormCenter").css("marginTop",window.innerHeight/5+"px");
};
window.onresize=function(){optimize();};