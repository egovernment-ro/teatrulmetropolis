$(document).ready(function() {
			$("a[rel=example_group]").fancybox({
				'transitionIn'		: 'elastic',
				'transitionOut'		: 'elastic',
				'titlePosition' 	: 'outside'
			});
			$("#hidden_link").fancybox({
				'width'				: '100%',
				'height'			: '100%',
				'autoScale'			: true,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'type'				: 'iframe',
				'onClosed'			: function() { parent.location='https://www.teatrulmetropolis.ro/';}
			});
			
			$("#hidden_link_dez").fancybox({
				'width'				: '100%',
				'height'			: '100%',
				'autoScale'			: true,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'type'				: 'iframe'
				
			});
			$("#hidden_link_error_login").fancybox({
				'width'				: 300,
				'height'			: 300,
				'type'				: 'iframe',
				'onClosed'			: function() { parent.location='https://www.teatrulmetropolis.ro/';}
			});
			$("#hidden2").fancybox({
				'width'				: '100%',
				'height'			: '100%',
				'autoScale'			: true,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'type'				: 'iframe'
			});
			
			$("#cumparare_bilet_pre").fancybox({
				'width'				: 850,
				'height'			: 570,
				'type'				: 'iframe',
				'onClosed'			: function() { parent.location.reload(true);}
			});
			$("a#fancybox_page").fancybox({
				'width'				: 850,
				'height'			: 570,
				'type'				: 'iframe',
				'onClosed'			: function() { parent.location.reload(true);}
			});
			$("a#fancybox_page_rel").fancybox({
				'width'				: 450,
				'height'			: 570,
				'type'				: 'iframe'
				
			});
			$("a#fancybox_page_no_reload").fancybox({
				'width'				: 850,
				'height'			: 570,
				'type'				: 'iframe'
			});
			
			});
var TabbedContent = {
	init: function() {	
		$(".tab_item").mouseover(function() {
		
			var background = $(this).parent().find(".moving_bg");
			
			$(background).stop().animate({
				left: $(this).position()['left']
			}, {
				duration: 300
			});
			
			TabbedContent.slideContent($(this));
			
		});
	},
	
	slideContent: function(obj) {
		
		var margin = $(obj).parent().parent().find(".slide_content").width();
		margin = margin * ($(obj).prevAll().size() - 1);
		margin = margin * -1;
		
		$(obj).parent().parent().find(".tabslider").stop().animate({
			marginLeft: margin + "px"
		}, {
			duration: 300
		});
	}
}


function moduleSearch() {
	url = '/cautare';
	
	var keyword = $('#keyword').attr('value')

	if (keyword) {
		url += '&cuvant_cheie=' + encodeURIComponent(trim(keyword));
		
	}
	
	location = url;
}

			
function submitenter_cauta(e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   moduleSearch();
   return false;
   }
else
   return true;
}

function submitenter_login_cont(e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   $('#form_autentificare').submit();
   return false;
   }
else
   return true;
}

function submitenter_newsletter(e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   showcaptcha();
   return false;
   }
else
   return true;
}

function submitenter_newsletter_trimite(e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if (keycode == 13)
   {
   $('#newsletter').submit();
   return false;
   }
else
   return true;
}

function getURLVar(urlVarName) {
	var urlHalves = String(document.location).toLowerCase().split('?');
	var urlVarValue = '';
	
	if (urlHalves[1]) {
		var urlVars = urlHalves[1].split('&');

		for (var i = 0; i <= (urlVars.length); i++) {
			if (urlVars[i]) {
				var urlVarPair = urlVars[i].split('=');
				
				if (urlVarPair[0] && urlVarPair[0] == urlVarName.toLowerCase()) {
					urlVarValue = urlVarPair[1];
				}
			}
		}
	}
	
	return urlVarValue;
} 

$(document).ready(function() {
	route = getURLVar('route');
	
	if (!route) {
		$('#tab_home').addClass('selected');
	} else {
		part = route.split('/');
		
		if (route == 'common/home') {
			$('#tab_home').addClass('selected');
		} else if (route == 'account/login') {
			$('#tab_login').addClass('selected');	
		} else if (part[0] == 'account') {
			$('#tab_account').addClass('selected');
		} else if (route == 'checkout/cart') {
			$('#tab_cart').addClass('selected');
		} else if (part[0] == 'checkout') {
			$('#tab_checkout').addClass('selected');
		} else {
			$('#tab_home').addClass('selected');
		}
	}
});
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}



function remove_handler(){
	var data = "action=remove";
	var tmp = this.id.split('_');
	var id = tmp[1]
	data = data+'&product_id='+id;
	$.ajax({
		type: 'post',
		url: 'index.php?route=module/compare/callback',
		dataType: 'html',
		data: data,
		success: function (html) {
			$('.middle_compare').html(html);
			$("a.remove_compare").click(remove_handler);
			$("a.remove_all_compare").click(remove_all_handler);
		}
	});
};

function add_handler(){
	var data = "action=add";
	var tmp = this.id.split('_');
	var id = tmp[1];
	data = data+'&product_id='+id;
	$.ajax({
		type: 'post',
		url: 'index.php?route=module/compare/callback',
		dataType: 'html',
		data: data,
		success: function (html) {
			$('.middle_compare').html(html);
			$("a.remove_compare").click(remove_handler);
			$("a.remove_all_compare").click(remove_all_handler);
		}
	});
};

function remove_all_handler(){
	var data = "action=remove_all";
	$.ajax({
		type: 'post',
		url: 'index.php?route=module/compare/callback',
		dataType: 'html',
		data: data,
		success: function (html) {
			$('.middle_compare').html(html);
		}
	});
};

var ddaccordion={
	
	contentclassname:{}, 

	expandone:function(headerclass, selected){ 
		this.toggleone(headerclass, selected, "expand")
	},

	collapseone:function(headerclass, selected){ 
		this.toggleone(headerclass, selected, "collapse")
	},

	expandall:function(headerclass){ 
		var $=jQuery
		var $headers=$('.'+headerclass)
		$('.'+this.contentclassname[headerclass]+':hidden').each(function(){
			$headers.eq(parseInt($(this).attr('contentindex'))).trigger("evt_accordion")
		})
	},

	collapseall:function(headerclass){ 
		var $=jQuery
		var $headers=$('.'+headerclass)
		$('.'+this.contentclassname[headerclass]+':visible').each(function(){
			$headers.eq(parseInt($(this).attr('contentindex'))).trigger("evt_accordion")
		})
	},

	toggleone:function(headerclass, selected, optstate){ 
		var $=jQuery
		var $targetHeader=$('.'+headerclass).eq(selected)
		var $subcontent=$('.'+this.contentclassname[headerclass]).eq(selected)
		if (typeof optstate=="undefined" || optstate=="expand" && $subcontent.is(":hidden") || optstate=="collapse" && $subcontent.is(":visible"))
			$targetHeader.trigger("evt_accordion")
	},

	expandit:function($targetHeader, $targetContent, config, useractivated, directclick){
		this.transformHeader($targetHeader, config, "expand")
		$targetContent.slideDown(config.animatespeed, function(){
			config.onopenclose($targetHeader.get(0), parseInt($targetHeader.attr('headerindex')), $targetContent.css('display'), useractivated)
			if (config.postreveal=="gotourl" && directclick){ 
				var targetLink=($targetHeader.is("a"))? $targetHeader.get(0) : $targetHeader.find('a:eq(0)').get(0)
				if (targetLink) 
					setTimeout(function(){location=targetLink.href}, 200) 
			}
		})
	},

	collapseit:function($targetHeader, $targetContent, config, isuseractivated){
		this.transformHeader($targetHeader, config, "collapse")
		$targetContent.slideUp(config.animatespeed, function(){config.onopenclose($targetHeader.get(0), parseInt($targetHeader.attr('headerindex')), $targetContent.css('display'), isuseractivated)})
	},

	transformHeader:function($targetHeader, config, state){
		$targetHeader.addClass((state=="expand")? config.cssclass.expand : config.cssclass.collapse)
		.removeClass((state=="expand")? config.cssclass.collapse : config.cssclass.expand)
		if (config.htmlsetting.location=='src'){ 
			$targetHeader=($targetHeader.is("img"))? $targetHeader : $targetHeader.find('img').eq(0) 
			$targetHeader.attr('src', (state=="expand")? config.htmlsetting.expand : config.htmlsetting.collapse) 
		}
		else if (config.htmlsetting.location=="prefix") 
			$targetHeader.find('.accordprefix').html((state=="expand")? config.htmlsetting.expand : config.htmlsetting.collapse)
		else if (config.htmlsetting.location=="suffix")
			$targetHeader.find('.accordsuffix').html((state=="expand")? config.htmlsetting.expand : config.htmlsetting.collapse)
	},

	urlparamselect:function(headerclass){
		var result=window.location.search.match(new RegExp(headerclass+"=((\\d+)(,(\\d+))*)", "i")) 
		if (result!=null)
			result=RegExp.$1.split(',')
		return result
	},

	getCookie:function(Name){ 
		var re=new RegExp(Name+"=[^;]+", "i") 
		if (document.cookie.match(re)) 
			return document.cookie.match(re)[0].split("=")[1] 
		return null
	
	},

	setCookie:function(name, value){
		document.cookie = name + "=" + value + "; path=/"
	},

	init:function(config){
	document.write('<style type="text/css">\n')
	document.write('.'+config.contentclass+'{display: none}\n') 
	document.write('<\/style>')
	jQuery(document).ready(function($){
		ddaccordion.urlparamselect(config.headerclass)
		var persistedheaders=ddaccordion.getCookie(config.headerclass)
		ddaccordion.contentclassname[config.headerclass]=config.contentclass 
		config.cssclass={collapse: config.toggleclass[0], expand: config.toggleclass[1]} 
		config.revealtype=config.revealtype || "click"
		config.revealtype=config.revealtype.replace(/mouseover/i, "mouseenter")
		if (config.revealtype=="clickgo"){
			config.postreveal="gotourl" 
			config.revealtype="click"
		}
		if (typeof config.togglehtml=="undefined")
			config.htmlsetting={location: "none"}
		else
			config.htmlsetting={location: config.togglehtml[0], collapse: config.togglehtml[1], expand: config.togglehtml[2]} 
		config.oninit=(typeof config.oninit=="undefined")? function(){} : config.oninit 
		config.onopenclose=(typeof config.onopenclose=="undefined")? function(){} : config.onopenclose 
		var lastexpanded={} 
		var expandedindices=ddaccordion.urlparamselect(config.headerclass) || ((config.persiststate && persistedheaders!=null)? persistedheaders : config.defaultexpanded)
		if (typeof expandedindices=='string')
			expandedindices=expandedindices.replace(/c/ig, '').split(',')
		var $subcontents=$('.'+config["contentclass"])
		if (expandedindices.length==1 && expandedindices[0]=="-1") 
			expandedindices=[]
		if (config["collapseprev"] && expandedindices.length>1) 
			expandedindices=[expandedindices.pop()] 
		if (config["onemustopen"] && expandedindices.length==0) 
			expandedindices=[0]
		
		$('.'+config["headerclass"]).each(function(index){ 
			if (/(prefix)|(suffix)/i.test(config.htmlsetting.location) && $(this).html()!=""){ 
				$('<span class="accordprefix"></span>').prependTo(this)
				$('<span class="accordsuffix"></span>').appendTo(this)
			}
			$(this).attr('headerindex', index+'h')
			$subcontents.eq(index).attr('contentindex', index+'c')
			var $subcontent=$subcontents.eq(index)
			var needle=(typeof expandedindices[0]=="number")? index : index+'' 
			if (jQuery.inArray(needle, expandedindices)!=-1){ 
				if (config.animatedefault==false)
					$subcontent.show()
				ddaccordion.expandit($(this), $subcontent, config, false) 
				lastexpanded={$header:$(this), $content:$subcontent}
			}  
			else{
				$subcontent.hide()
				config.onopenclose($(this).get(0), parseInt($(this).attr('headerindex')), $subcontent.css('display'), false) 
				ddaccordion.transformHeader($(this), config, "collapse")
			}
		})
		$('.'+config["headerclass"]).bind("evt_accordion", function(e, isdirectclick){ 
				var $subcontent=$subcontents.eq(parseInt($(this).attr('headerindex'))) 
				if ($subcontent.css('display')=="none"){
					ddaccordion.expandit($(this), $subcontent, config, true, isdirectclick) 
					if (config["collapseprev"] && lastexpanded.$header && $(this).get(0)!=lastexpanded.$header.get(0)){ 
						ddaccordion.collapseit(lastexpanded.$header, lastexpanded.$content, config, true) 
					}
					lastexpanded={$header:$(this), $content:$subcontent}
				}
				else if (!config["onemustopen"] || config["onemustopen"] && lastexpanded.$header && $(this).get(0)!=lastexpanded.$header.get(0)){
					ddaccordion.collapseit($(this), $subcontent, config, true) 
				}
 		})
		$('.'+config["headerclass"]).bind(config.revealtype, function(){
			if (config.revealtype=="mouseenter"){
				clearTimeout(config.revealdelay)
				var headerindex=parseInt($(this).attr("headerindex"))
				config.revealdelay=setTimeout(function(){ddaccordion.expandone(config["headerclass"], headerindex)}, config.mouseoverdelay || 0)
			}
			else{
				$(this).trigger("evt_accordion", [true])
				return false 
			}
		})
		$('.'+config["headerclass"]).bind("mouseleave", function(){
			clearTimeout(config.revealdelay)
		})
		config.oninit($('.'+config["headerclass"]).get(), expandedindices)
		$(window).bind('unload', function(){ 
			$('.'+config["headerclass"]).unbind()
			var expandedindices=[]
			$('.'+config["contentclass"]+":visible").each(function(index){ 
				expandedindices.push($(this).attr('contentindex'))
			})
			if (config.persiststate==true && $('.'+config["headerclass"]).length>0){ 
				expandedindices=(expandedindices.length==0)? '-1c' : expandedindices 
				ddaccordion.setCookie(config.headerclass, expandedindices);
			}
			else {ddaccordion.setCookie(config.headerclass, '-1c')}
		})
	})
	}
};

(function($) {

	$.fn.easySlider = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			controlsShow:	true,
			controlsBefore:	'',
			controlsAfter:	'',	
			controlsFade:	true,
			firstId: 		'firstBtn',
			firstText: 		'First',
			firstShow:		false,
			lastId: 		'lastBtn',	
			lastText: 		'Last',
			lastShow:		false,				
			vertical:		false,
			speed: 			800,
			auto:			false,
			pause:			2000,
			continuous:		false, 
			numeric: 		false,
			numericId: 		'controls'
		}; 
		
		var options = $.extend(defaults, options);  
				
		this.each(function() {  
			var obj = $(this); 				
			var s = $("li", obj).length;
			var w = $("li", obj).width(); 
			var h = $("li", obj).height(); 
			var clickable = true;
			obj.width(w); 
			obj.height(h); 
			obj.css("overflow","hidden");
			var ts = s-1;
			var t = 0;
			$("ul", obj).css('width',s*w);			
			
			if(options.continuous){
				$("ul", obj).prepend($("ul li:last-child", obj).clone().css("margin-left","-"+ w +"px"));
				$("ul", obj).append($("ul li:nth-child(2)", obj).clone());
				$("ul", obj).css('width',(s+1)*w);
			};				
			
			if(!options.vertical) $("li", obj).css('float','left');
								
			if(options.controlsShow){
				var html = options.controlsBefore;				
				if(options.numeric){
					html += '<ol id="'+ options.numericId +'"></ol>';
				} else {
					if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"\">'+ options.firstText +'</a></span>';
					html += ' <span id="'+ options.prevId +'"><a href=\"\">'+ options.prevText +'</a></span>';
					html += ' <span id="'+ options.nextId +'"><a href=\"\">'+ options.nextText +'</a></span>';
					if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"\">'+ options.lastText +'</a></span>';				
				};
				
				html += options.controlsAfter;						
				$(obj).after(html);										
			};
			
			if(options.numeric){									
				for(var i=0;i<s;i++){						
					$(document.createElement("li"))
						.attr('id',options.numericId + (i+1))
						.html('<a rel='+ i +' href=\"\">'+ (i+1) +'</a>')
						.appendTo($("#"+ options.numericId))
						.click(function(){							
							animate($("a",$(this)).attr('rel'),true);
						}); 												
				};	
				 
					
			} else {
				$("a","#"+options.nextId).click(function(){		
					animate("next",true);
				});
				$("a","#"+options.prevId).click(function(){		
					animate("prev",true);				
				});	
				$("a","#"+options.firstId).click(function(){		
					animate("first",true);
				});				
				$("a","#"+options.lastId).click(function(){		
					animate("last",true);				
				});				
			};
			
			function setCurrent(i){
				i = parseInt(i)+1;
				$("li", "#" + options.numericId).removeClass("current");
				$("li#" + options.numericId + i).addClass("current");
			};
			
			function adjust(){
				if(t>ts) t=0;		
				if(t<0) t=ts;	
				if(!options.vertical) {
					$("ul",obj).css("margin-left",(t*w*-1));
				} else {
					$("ul",obj).css("margin-left",(t*h*-1));
				}
				clickable = true;
				if(options.numeric) setCurrent(t);
			};
			
			function animate(dir,clicked){
				if (clickable){
					clickable = false;
					var ot = t;				
					switch(dir){
						case "next":
							t = (ot>=ts) ? (options.continuous ? t+1 : ts) : t+1;						
							break; 
						case "prev":
							t = (t<=0) ? (options.continuous ? t-1 : 0) : t-1;
							break; 
						case "first":
							t = 0;
							break; 
						case "last":
							t = ts;
							break; 
						default:
							t = dir;
							break; 
					};	
					var diff = Math.abs(ot-t);
					var speed = diff*options.speed;						
					if(!options.vertical) {
						p = (t*w*-1);
						$("ul",obj).animate(
							{ marginLeft: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);				
					} else {
						p = (t*h*-1);
						$("ul",obj).animate(
							{ marginTop: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);					
					};
					
					if(!options.continuous && options.controlsFade){					
						if(t==ts){
							$("a","#"+options.nextId).hide();
							$("a","#"+options.lastId).hide();
						} else {
							$("a","#"+options.nextId).show();
							$("a","#"+options.lastId).show();					
						};
						if(t==0){
							$("a","#"+options.prevId).hide();
							$("a","#"+options.firstId).hide();
						} else {
							$("a","#"+options.prevId).show();
							$("a","#"+options.firstId).show();
						};					
					};				
					
					if(clicked) clearTimeout(timeout);
					if(options.auto && dir=="next" && !clicked){;
						timeout = setTimeout(function(){
							animate("next",false);
						},diff*options.speed+options.pause);
					};
			
				};
				
			};
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
			
			if(options.numeric) setCurrent(0);
		
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};				
			
		});
	  
	};

})(jQuery);

(function($) {

	$.fn.easySlider2 = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 		'prevBtn',
			prevText: 		'Previous',
			nextId: 		'nextBtn',	
			nextText: 		'Next',
			controlsShow:	false,
			controlsBefore:	'',
			controlsAfter:	'',	
			controlsFade:	false,
			firstId: 		'firstBtn',
			firstText: 		'First',
			firstShow:		false,
			lastId: 		'lastBtn',	
			lastText: 		'Last',
			lastShow:		false,				
			vertical:		true,
			speed: 			600,
			auto:			true,
			pause:			3000,
			continuous:		true, 
			numeric: 		false,
			numericId: 		'controls'
		}; 
		
		var options = $.extend(defaults, options);  
				
		this.each(function() {  
			var obj = $(this);
			var ul = obj.children("ul");
            var li = ul.children("li");
			
			var s = $("li", obj).length;
			var w = $("li", obj).width(); 
			var h = $("li", obj).height(); 
			var clickable = true;
			obj.width(w); 
			obj.height(h); 
			obj.css("overflow","hidden");
			var ts = s-1;
			var t = 0;
			$("ul", obj).css('width',s*w);			
			
			if(options.continuous){
                if(options.vertical)
                {
                    ul.prepend(li.filter(":last-child").clone().css("margin-top","-"+ h +"px"));
                    ul.append(li.filter(":nth-child(2)").clone());
                    ul.height((s+1)*h);
                } else {
                    ul.prepend(li.filter(":last-child").clone().css("margin-left","-"+ w +"px"));
                    ul.append(li.filter(":nth-child(2)").clone());
                    ul.width((s+1)*w);
                }
            };
				
			
			if(!options.vertical) $("li", obj).css('float','left');
								
			if(options.controlsShow){
				var html = options.controlsBefore;				
				if(options.numeric){
					html += '<ol id="'+ options.numericId +'"></ol>';
				} else {
					if(options.firstShow) html += '<span id="'+ options.firstId +'"><a href=\"\">'+ options.firstText +'</a></span>';
					html += ' <span id="'+ options.prevId +'"><a href=\"\">'+ options.prevText +'</a></span>';
					html += ' <span id="'+ options.nextId +'"><a href=\"\">'+ options.nextText +'</a></span>';
					if(options.lastShow) html += ' <span id="'+ options.lastId +'"><a href=\"\">'+ options.lastText +'</a></span>';				
				};
				
				html += options.controlsAfter;						
				$(obj).after(html);										
			};
			
			if(options.numeric){									
				for(var i=0;i<s;i++){						
					$(document.createElement("li"))
						.attr('id',options.numericId + (i+1))
						.html('<a rel='+ i +' href=\"\">'+ (i+1) +'</a>')
						.appendTo($("#"+ options.numericId))
						.click(function(){							
							animate($("a",$(this)).attr('rel'),true);
						}); 												
				};	
				 
					
			} else {
				$("a","#"+options.nextId).click(function(){		
					animate("next",true);
				});
				$("a","#"+options.prevId).click(function(){		
					animate("prev",true);				
				});	
				$("a","#"+options.firstId).click(function(){		
					animate("first",true);
				});				
				$("a","#"+options.lastId).click(function(){		
					animate("last",true);				
				});				
			};
			
			function setCurrent(i){
				i = parseInt(i)+1;
				$("li", "#" + options.numericId).removeClass("current");
				$("li#" + options.numericId + i).addClass("current");
			};
			
			function adjust(){
				if(t>ts) t=0;		
				if(t<0) t=ts;
				
				if(!options.vertical) {
					$("ul",obj).css("margin-left",(t*w*-1));
				} else {
					$("ul",obj).css("margin-top",(t*h*-1));
				}
				clickable = true;
				if(options.numeric) setCurrent(t);
			};
			
			function animate(dir,clicked){
				if (clickable){
					clickable = false;
					var ot = t;				
					switch(dir){
						case "next":
							t = (ot>=ts) ? (options.continuous ? t+1 : ts) : t+1;						
							break; 
						case "prev":
							t = (t<=0) ? (options.continuous ? t-1 : 0) : t-1;
							break; 
						case "first":
							t = 0;
							break; 
						case "last":
							t = ts;
							break; 
						default:
							t = dir;
							break; 
					};	
					var diff = Math.abs(ot-t);
					var speed = diff*options.speed;						
					if(!options.vertical) {
						p = (t*w*-1);
						$("ul",obj).animate(
							{ marginLeft: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);				
					} else {
						p = (t*h*-1);
						$("ul",obj).animate(
							{ marginTop: p }, 
							{ queue:false, duration:speed, complete:adjust }
						);					
					};
					
					if(!options.continuous && options.controlsFade){					
						if(t==ts){
							$("a","#"+options.nextId).hide();
							$("a","#"+options.lastId).hide();
						} else {
							$("a","#"+options.nextId).show();
							$("a","#"+options.lastId).show();					
						};
						if(t==0){
							$("a","#"+options.prevId).hide();
							$("a","#"+options.firstId).hide();
						} else {
							$("a","#"+options.prevId).show();
							$("a","#"+options.firstId).show();
						};					
					};				
					
					if(clicked) clearTimeout(timeout);
					if(options.auto && dir=="next" && !clicked){;
						timeout = setTimeout(function(){
							animate("next",false);
						},diff*options.speed+options.pause);
					};
			
				};
				
			};
			// init
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
			
			if(options.numeric) setCurrent(0);
		
			if(!options.continuous && options.controlsFade){					
				$("a","#"+options.prevId).hide();
				$("a","#"+options.firstId).hide();				
			};				
			
		});
	  
	};

})(jQuery);

jQuery.fn.prettyCheckboxes=function(a){
	a=jQuery.extend({checkboxWidth:17,checkboxHeight:17,className:"prettyCheckbox",display:"list"},a);
	$(this).each(function(){
		$label=$('label[for="'+$(this).attr("id")+'"]');
		$label.prepend("<span class='holderWrap'><span class='holder'></span></span>");
		if($(this).is(":checked")){$label.addClass("checked")}
		$label.addClass(a.className).addClass($(this).attr("type")).addClass(a.display);
		$label.find("span.holderWrap").width(a.checkboxWidth).height(a.checkboxHeight);
		$label.find("span.holder").width(a.checkboxWidth);$(this).addClass("hiddenCheckbox");
		$label.bind("click",function(){$("input#"+$(this).attr("for")).triggerHandler("click");
		if($("input#"+$(this).attr("for")).is(":checkbox"))
			{$(this).toggleClass("checked");$("input#"+$(this).attr("for")).checked=true;$(this).find("span.holder").css("top",0)}
		else{$toCheck=$("input#"+$(this).attr("for"));$('input[name="'+$toCheck.attr("name")+'"]').each(function(){$('label[for="'+$(this).attr("id")+'"]').removeClass("checked")});$(this).addClass("checked");$toCheck.checked=true}
		});
		$("input#"+$label.attr("for")).bind("keypress",function(b){
			if(b.keyCode==32){
				if($.browser.msie){$('label[for="'+$(this).attr("id")+'"]').toggleClass("checked")}
				else{$(this).trigger("click")}
			return false}
		})
	})};

checkAllPrettyCheckboxes=function(b,a){
	if($(b).is(":checked")){
		$(a).find("input[type=checkbox]:not(:checked)").each(function(){
			$('label[for="'+$(this).attr("id")+'"]').trigger("click");
				if($.browser.msie){$(this).attr("checked","checked")}
				else{$(this).trigger("click")}
			})}
	else
		{$(a).find("input[type=checkbox]:checked").each(function(){$('label[for="'+$(this).attr("id")+'"]').trigger("click");if($.browser.msie){$(this).attr("checked","")}else{$(this).trigger("click")}})}};
		
(function($) {

	var tmp, loading, overlay, wrap, outer, inner, close, nav_left, nav_right,

		selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

		ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

		loadingTimer, loadingFrame = 1,

		start_pos, final_pos, busy = false, shadow = 20, fx = $.extend($('<div/>')[0], { prop: 0 }), titleh = 0, 

		isIE6 = !$.support.opacity && !window.XMLHttpRequest,

		/*
		 * Private methods 
		 */

		fancybox_abort = function() {
			loading.hide();

			imgPreloader.onerror = imgPreloader.onload = null;

			if (ajaxLoader) {
				ajaxLoader.abort();
			}

			tmp.empty();
		},

		fancybox_error = function() {
			$.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
				'scrolling'		: 'no',
				'padding'		: 20,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none'
			});
		},

		fancybox_get_viewport = function() {
			return [ $(window).width(), $(window).height(), $(document).scrollLeft(), $(document).scrollTop() ];
		},

		fancybox_get_zoom_to = function () {
			var view	= fancybox_get_viewport(),
				to		= {},

				margin = currentOpts.margin,
				resize = currentOpts.autoScale,

				horizontal_space	= (shadow + margin) * 2,
				vertical_space		= (shadow + margin) * 2,
				double_padding		= (currentOpts.padding * 2),
				
				ratio;

			if (currentOpts.width.toString().indexOf('%') > -1) {
				to.width = ((view[0] * parseFloat(currentOpts.width)) / 100) - (shadow * 2) ;
				resize = false;

			} else {
				to.width = currentOpts.width + double_padding;
			}

			if (currentOpts.height.toString().indexOf('%') > -1) {
				to.height = ((view[1] * parseFloat(currentOpts.height)) / 100) - (shadow * 2);
				resize = false;

			} else {
				to.height = currentOpts.height + double_padding;
			}

			if (resize && (to.width > (view[0] - horizontal_space) || to.height > (view[1] - vertical_space))) {
				if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
					horizontal_space	+= double_padding;
					vertical_space		+= double_padding;

					ratio = Math.min(Math.min( view[0] - horizontal_space, currentOpts.width) / currentOpts.width, Math.min( view[1] - vertical_space, currentOpts.height) / currentOpts.height);

					to.width	= Math.round(ratio * (to.width	- double_padding)) + double_padding;
					to.height	= Math.round(ratio * (to.height	- double_padding)) + double_padding;

				} else {
					to.width	= Math.min(to.width,	(view[0] - horizontal_space));
					to.height	= Math.min(to.height,	(view[1] - vertical_space));
				}
			}

			to.top	= view[3] + ((view[1] - (to.height	+ (shadow * 2 ))) * 0.5);
			to.left	= view[2] + ((view[0] - (to.width	+ (shadow * 2 ))) * 0.5);

			if (currentOpts.autoScale === false) {
				to.top	= Math.max(view[3] + margin, to.top);
				to.left	= Math.max(view[2] + margin, to.left);
			}

			return to;
		},

		fancybox_format_title = function(title) {
			if (title && title.length) {
				switch (currentOpts.titlePosition) {
					case 'inside':
						return title;
					case 'over':
						return '<span id="fancybox-title-over">' + title + '</span>';
					default:
						return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' + title + '</span><span id="fancybox-title-right"></span></span>';
				}
			}

			return false;
		},

		fancybox_process_title = function() {
			var title	= currentOpts.title,
				width	= final_pos.width - (currentOpts.padding * 2),
				titlec	= 'fancybox-title-' + currentOpts.titlePosition;
				
			$('#fancybox-title').remove();

			titleh = 0;

			if (currentOpts.titleShow === false) {
				return;
			}

			title = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(title, currentArray, currentIndex, currentOpts) : fancybox_format_title(title);

			if (!title || title === '') {
				return;
			}

			$('<div id="fancybox-title" class="' + titlec + '" />').css({
				'width'			: width,
				'paddingLeft'	: currentOpts.padding,
				'paddingRight'	: currentOpts.padding
			}).html(title).appendTo('body');

			switch (currentOpts.titlePosition) {
				case 'inside':
					titleh = $("#fancybox-title").outerHeight(true) - currentOpts.padding;
					final_pos.height += titleh;
				break;

				case 'over':
					$('#fancybox-title').css('bottom', currentOpts.padding);
				break;

				default:
					$('#fancybox-title').css('bottom', $("#fancybox-title").outerHeight(true) * -1);
				break;
			}

			$('#fancybox-title').appendTo( outer ).hide();
		},

		fancybox_set_navigation = function() {
			$(document).unbind('keydown.fb').bind('keydown.fb', function(e) {
				if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
					e.preventDefault();
					$.fancybox.close();

				} else if (e.keyCode == 37) {
					e.preventDefault();
					$.fancybox.prev();

				} else if (e.keyCode == 39) {
					e.preventDefault();
					$.fancybox.next();
				}
			});

			if ($.fn.mousewheel) {
				wrap.unbind('mousewheel.fb');

				if (currentArray.length > 1) {
					wrap.bind('mousewheel.fb', function(e, delta) {
						e.preventDefault();

						if (busy || delta === 0) {
							return;
						}

						if (delta > 0) {
							$.fancybox.prev();
						} else {
							$.fancybox.next();
						}
					});
				}
			}

			if (!currentOpts.showNavArrows) { return; }

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
				nav_left.show();
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
				nav_right.show();
			}
		},

		fancybox_preload_images = function() {
			var href, 
				objNext;
				
			if ((currentArray.length -1) > currentIndex) {
				href = currentArray[ currentIndex + 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (currentIndex > 0) {
				href = currentArray[ currentIndex - 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		},

		_finish = function () {
			inner.css('overflow', (currentOpts.scrolling == 'auto' ? (currentOpts.type == 'image' || currentOpts.type == 'iframe' || currentOpts.type == 'swf' ? 'hidden' : 'auto') : (currentOpts.scrolling == 'yes' ? 'auto' : 'visible')));

			if (!$.support.opacity) {
				inner.get(0).style.removeAttribute('filter');
				wrap.get(0).style.removeAttribute('filter');
			}

			$('#fancybox-title').show();

			if (currentOpts.hideOnContentClick)	{
				inner.one('click', $.fancybox.close);
			}
			if (currentOpts.hideOnOverlayClick)	{
				overlay.one('click', $.fancybox.close);
			}

			if (currentOpts.showCloseButton) {
				close.show();
			}

			fancybox_set_navigation();

			$(window).bind("resize.fb", $.fancybox.center);

			if (currentOpts.centerOnScroll) {
				$(window).bind("scroll.fb", $.fancybox.center);
			} else {
				$(window).unbind("scroll.fb");
			}

			if ($.isFunction(currentOpts.onComplete)) {
				currentOpts.onComplete(currentArray, currentIndex, currentOpts);
			}

			busy = false;

			fancybox_preload_images();
		},

		fancybox_draw = function(pos) {
			var width	= Math.round(start_pos.width	+ (final_pos.width	- start_pos.width)	* pos),
				height	= Math.round(start_pos.height	+ (final_pos.height	- start_pos.height)	* pos),

				top		= Math.round(start_pos.top	+ (final_pos.top	- start_pos.top)	* pos),
				left	= Math.round(start_pos.left	+ (final_pos.left	- start_pos.left)	* pos);

			wrap.css({
				'width'		: width		+ 'px',
				'height'	: height	+ 'px',
				'top'		: top		+ 'px',
				'left'		: left		+ 'px'
			});

			width	= Math.max(width - currentOpts.padding * 2, 0);
			height	= Math.max(height - (currentOpts.padding * 2 + (titleh * pos)), 0);

			inner.css({
				'width'		: width		+ 'px',
				'height'	: height	+ 'px'
			});

			if (typeof final_pos.opacity !== 'undefined') {
				wrap.css('opacity', (pos < 0.5 ? 0.5 : pos));
			}
		},

		fancybox_get_obj_pos = function(obj) {
			var pos		= obj.offset();

			pos.top		+= parseFloat( obj.css('paddingTop') )	|| 0;
			pos.left	+= parseFloat( obj.css('paddingLeft') )	|| 0;

			pos.top		+= parseFloat( obj.css('border-top-width') )	|| 0;
			pos.left	+= parseFloat( obj.css('border-left-width') )	|| 0;

			pos.width	= obj.width();
			pos.height	= obj.height();

			return pos;
		},

		fancybox_get_zoom_from = function() {
			var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
				from = {},
				pos,
				view;

			if (orig && orig.length) {
				pos = fancybox_get_obj_pos(orig);

				from = {
					width	: (pos.width	+ (currentOpts.padding * 2)),
					height	: (pos.height	+ (currentOpts.padding * 2)),
					top		: (pos.top		- currentOpts.padding - shadow),
					left	: (pos.left		- currentOpts.padding - shadow)
				};
				
			} else {
				view = fancybox_get_viewport();

				from = {
					width	: 1,
					height	: 1,
					top		: view[3] + view[1] * 0.5,
					left	: view[2] + view[0] * 0.5
				};
			}

			return from;
		},

		fancybox_show = function() {
			loading.hide();

			if (wrap.is(":visible") && $.isFunction(currentOpts.onCleanup)) {
				if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
					$.event.trigger('fancybox-cancel');

					busy = false;
					return;
				}
			}

			currentArray	= selectedArray;
			currentIndex	= selectedIndex;
			currentOpts		= selectedOpts;

			inner.get(0).scrollTop	= 0;
			inner.get(0).scrollLeft	= 0;

			if (currentOpts.overlayShow) {
				if (isIE6) {
					$('select:not(#fancybox-tmp select)').filter(function() {
						return this.style.visibility !== 'hidden';
					}).css({'visibility':'hidden'}).one('fancybox-cleanup', function() {
						this.style.visibility = 'inherit';
					});
				}

				overlay.css({
					'background-color'	: currentOpts.overlayColor,
					'opacity'			: currentOpts.overlayOpacity
				}).unbind().show();
			}

			final_pos = fancybox_get_zoom_to();

			fancybox_process_title();

			if (wrap.is(":visible")) {
				$( close.add( nav_left ).add( nav_right ) ).hide();

				var pos = wrap.position(),
					equal;

				start_pos = {
					top		:	pos.top ,
					left	:	pos.left,
					width	:	wrap.width(),
					height	:	wrap.height()
				};

				equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

				inner.fadeOut(currentOpts.changeFade, function() {
					var finish_resizing = function() {
						inner.html( tmp.contents() ).fadeIn(currentOpts.changeFade, _finish);
					};
					
					$.event.trigger('fancybox-change');

					inner.empty().css('overflow', 'hidden');

					if (equal) {
						inner.css({
							top			: currentOpts.padding,
							left		: currentOpts.padding,
							width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
							height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
						});
						
						finish_resizing();

					} else {
						inner.css({
							top			: currentOpts.padding,
							left		: currentOpts.padding,
							width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
							height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
						});
						
						fx.prop = 0;

						$(fx).animate({ prop: 1 }, {
							 duration	: currentOpts.changeSpeed,
							 easing		: currentOpts.easingChange,
							 step		: fancybox_draw,
							 complete	: finish_resizing
						});
					}
				});

				return;
			}

			wrap.css('opacity', 1);

			if (currentOpts.transitionIn == 'elastic') {
				start_pos = fancybox_get_zoom_from();

				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
					})
					.html( tmp.contents() );

				wrap.css(start_pos).show();

				if (currentOpts.opacity) {
					final_pos.opacity = 0;
				}

				fx.prop = 0;

				$(fx).animate({ prop: 1 }, {
					 duration	: currentOpts.speedIn,
					 easing		: currentOpts.easingIn,
					 step		: fancybox_draw,
					 complete	: _finish
				});

			} else {
				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
					})
					.html( tmp.contents() );

				wrap.css( final_pos ).fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
			}
		},

		fancybox_process_inline = function() {
			tmp.width(	selectedOpts.width );
			tmp.height(	selectedOpts.height );

			if (selectedOpts.width	== 'auto') {
				selectedOpts.width = tmp.width();
			}
			if (selectedOpts.height	== 'auto') {
				selectedOpts.height	= tmp.height();
			}

			fancybox_show();
		},
		
		fancybox_process_image = function() {
			busy = true;

			selectedOpts.width	= imgPreloader.width;
			selectedOpts.height	= imgPreloader.height;

			$("<img />").attr({
				'id'	: 'fancybox-img',
				'src'	: imgPreloader.src,
				'alt'	: selectedOpts.title
			}).appendTo( tmp );

			fancybox_show();
		},

		fancybox_start = function() {
			fancybox_abort();

			var obj	= selectedArray[ selectedIndex ],
				href, 
				type, 
				title,
				str,
				emb,
				selector,
				data;

			selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));
			title = obj.title || $(obj).title || selectedOpts.title || '';
			
			if (obj.nodeName && !selectedOpts.orig) {
				selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
			}

			if (title === '' && selectedOpts.orig) {
				title = selectedOpts.orig.attr('alt');
			}

			if (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href)) {
				href = selectedOpts.href || null;
			} else {
				href = selectedOpts.href || obj.href || null;
			}

			if (selectedOpts.type) {
				type = selectedOpts.type;

				if (!href) {
					href = selectedOpts.content;
				}
				
			} else if (selectedOpts.content) {
				type	= 'html';

			} else if (href) {
				if (href.match(imgRegExp)) {
					type = 'image';

				} else if (href.match(swfRegExp)) {
					type = 'swf';

				} else if ($(obj).hasClass("iframe")) {
					type = 'iframe';

				} else if (href.match(/#/)) {
					obj = href.substr(href.indexOf("#"));

					type = $(obj).length > 0 ? 'inline' : 'ajax';
				} else {
					type = 'ajax';
				}
			} else {
				type = 'inline';
			}

			selectedOpts.type	= type;
			selectedOpts.href	= href;
			selectedOpts.title	= title;

			if (selectedOpts.autoDimensions && selectedOpts.type !== 'iframe' && selectedOpts.type !== 'swf') {
				selectedOpts.width		= 'auto';
				selectedOpts.height		= 'auto';
			}

			if (selectedOpts.modal) {
				selectedOpts.overlayShow		= true;
				selectedOpts.hideOnOverlayClick	= false;
				selectedOpts.hideOnContentClick	= false;
				selectedOpts.enableEscapeButton	= false;
				selectedOpts.showCloseButton	= false;
			}

			if ($.isFunction(selectedOpts.onStart)) {
				if (selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts) === false) {
					busy = false;
					return;
				}
			}

			tmp.css('padding', (shadow + selectedOpts.padding + selectedOpts.margin));

			$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
				$(this).replaceWith(inner.children());
			});

			switch (type) {
				case 'html' :
					tmp.html( selectedOpts.content );
					fancybox_process_inline();
				break;

				case 'inline' :
					$('<div class="fancybox-inline-tmp" />').hide().insertBefore( $(obj) ).bind('fancybox-cleanup', function() {
						$(this).replaceWith(inner.children());
					}).bind('fancybox-cancel', function() {
						$(this).replaceWith(tmp.children());
					});

					$(obj).appendTo(tmp);

					fancybox_process_inline();
				break;

				case 'image':
					busy = false;

					$.fancybox.showActivity();

					imgPreloader = new Image();

					imgPreloader.onerror = function() {
						fancybox_error();
					};

					imgPreloader.onload = function() {
						imgPreloader.onerror = null;
						imgPreloader.onload = null;
						fancybox_process_image();
					};

					imgPreloader.src = href;
		
				break;

				case 'swf':
					str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
					emb = '';
					
					$.each(selectedOpts.swf, function(name, val) {
						str += '<param name="' + name + '" value="' + val + '"></param>';
						emb += ' ' + name + '="' + val + '"';
					});

					str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

					tmp.html(str);

					fancybox_process_inline();
				break;

				case 'ajax':
					selector	= href.split('#', 2);
					data		= selectedOpts.ajax.data || {};

					if (selector.length > 1) {
						href = selector[0];

						if (typeof data == "string") {
							data += '&selector=' + selector[1];
						} else {
							data.selector = selector[1];
						}
					}

					busy = false;
					$.fancybox.showActivity();

					ajaxLoader = $.ajax($.extend(selectedOpts.ajax, {
						url		: href,
						data	: data,
						error	: fancybox_error,
						success : function(data, textStatus, XMLHttpRequest) {
							if (ajaxLoader.status == 200) {
								tmp.html( data );
								fancybox_process_inline();
							}
						}
					}));

				break;

				case 'iframe' :
					$('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" scrolling="' + selectedOpts.scrolling + '" src="' + selectedOpts.href + '"></iframe>').appendTo(tmp);
					fancybox_show();
				break;
			}
		},

		fancybox_animate_loading = function() {
			if (!loading.is(':visible')){
				clearInterval(loadingTimer);
				return;
			}

			$('div', loading).css('top', (loadingFrame * -40) + 'px');

			loadingFrame = (loadingFrame + 1) % 12;
		},

		fancybox_init = function() {
			if ($("#fancybox-wrap").length) {
				return;
			}

			$('body').append(
				tmp			= $('<div id="fancybox-tmp"></div>'),
				loading		= $('<div id="fancybox-loading"><div></div></div>'),
				overlay		= $('<div id="fancybox-overlay"></div>'),
				wrap		= $('<div id="fancybox-wrap"></div>')
			);

			if (!$.support.opacity) {
				wrap.addClass('fancybox-ie');
				loading.addClass('fancybox-ie');
			}

			outer = $('<div id="fancybox-outer"></div>')
				.append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>')
				.appendTo( wrap );

			outer.append(
				inner		= $('<div id="fancybox-inner"></div>'),
				close		= $('<a id="fancybox-close"></a>'),

				nav_left	= $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
				nav_right	= $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
			);

			close.click($.fancybox.close);
			loading.click($.fancybox.cancel);

			nav_left.click(function(e) {
				e.preventDefault();
				$.fancybox.prev();
			});

			nav_right.click(function(e) {
				e.preventDefault();
				$.fancybox.next();
			});

			if (isIE6) {
				overlay.get(0).style.setExpression('height',	"document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
				loading.get(0).style.setExpression('top',		"(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");

				outer.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>');
			}
		};

	/*
	 * Public methods 
	 */

	$.fn.fancybox = function(options) {
		$(this)
			.data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
			.unbind('click.fb').bind('click.fb', function(e) {
				e.preventDefault();

				if (busy) {
					return;
				}

				busy = true;

				$(this).blur();

				selectedArray	= [];
				selectedIndex	= 0;

				var rel = $(this).attr('rel') || '';

				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);

				} else {
					selectedArray	= $("a[rel=" + rel + "], area[rel=" + rel + "]");
					selectedIndex	= selectedArray.index( this );
				}

				fancybox_start();

				return false;
			});

		return this;
	};

	$.fancybox = function(obj) {
		if (busy) {
			return;
		}

		busy = true;

		var opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

		selectedArray	= [];
		selectedIndex	= opts.index || 0;

		if ($.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					$(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
				} else {
					obj[i] = $({}).data('fancybox', $.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				$(obj).data('fancybox', $.extend({}, opts, obj));
			} else {
				obj = $({}).data('fancybox', $.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		if (selectedIndex > selectedArray.length || selectedIndex < 0) {
			selectedIndex = 0;
		}

		fancybox_start();
	};

	$.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(fancybox_animate_loading, 66);
	};

	$.fancybox.hideActivity = function() {
		loading.hide();
	};

	$.fancybox.next = function() {
		return $.fancybox.pos( currentIndex + 1);
	};
	
	$.fancybox.prev = function() {
		return $.fancybox.pos( currentIndex - 1);
	};

	$.fancybox.pos = function(pos) {
		if (busy) {
			return;
		}

		pos = parseInt(pos, 10);

		if (pos > -1 && currentArray.length > pos) {
			selectedIndex = pos;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos < 0) {
			selectedIndex = currentArray.length - 1;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos >= currentArray.length) {
			selectedIndex = 0;
			fancybox_start();
		}

		return;
	};

	$.fancybox.cancel = function() {
		if (busy) {
			return;
		}

		busy = true;

		$.event.trigger('fancybox-cancel');

		fancybox_abort();

		if (selectedOpts && $.isFunction(selectedOpts.onCancel)) {
			selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);
		}

		busy = false;
	};

	// Note: within an iframe use - parent.$.fancybox.close();
	$.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		if (currentOpts && $.isFunction(currentOpts.onCleanup)) {
			if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
				busy = false;
				return;
			}
		}

		fancybox_abort();

		$(close.add( nav_left ).add( nav_right )).hide();

		$('#fancybox-title').remove();

		wrap.add(inner).add(overlay).unbind();

		$(window).unbind("resize.fb scroll.fb");
		$(document).unbind('keydown.fb');

		function _cleanup() {
			overlay.fadeOut('fast');

			wrap.hide();

			$.event.trigger('fancybox-cleanup');

			inner.empty();

			if ($.isFunction(currentOpts.onClosed)) {
				currentOpts.onClosed(currentArray, currentIndex, currentOpts);
			}

			currentArray	= selectedOpts	= [];
			currentIndex	= selectedIndex	= 0;
			currentOpts		= selectedOpts	= {};

			busy = false;
		}

		inner.css('overflow', 'hidden');

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = fancybox_get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top		:	pos.top ,
				left	:	pos.left,
				width	:	wrap.width(),
				height	:	wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			fx.prop = 1;

			$(fx).animate({ prop: 0 }, {
				 duration	: currentOpts.speedOut,
				 easing		: currentOpts.easingOut,
				 step		: fancybox_draw,
				 complete	: _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	$.fancybox.resize = function() {
		var c, h;
		
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		c = inner.wrapInner("<div style='overflow:auto'></div>").children();
		h = c.height();

		wrap.css({height:	h + (currentOpts.padding * 2) + titleh});
		inner.css({height:	h});

		c.replaceWith(c.children());

		$.fancybox.center();
	};

	$.fancybox.center = function() {
		busy = true;

		var view	= fancybox_get_viewport(),
			margin	= currentOpts.margin,
			to		= {};

		to.top	= view[3] + ((view[1] - ((wrap.height() - titleh) + (shadow * 2 ))) * 0.5);
		to.left	= view[2] + ((view[0] - (wrap.width() + (shadow * 2 ))) * 0.5);

		to.top	= Math.max(view[3] + margin, to.top);
		to.left	= Math.max(view[2] + margin, to.left);

		wrap.css(to);

		busy = false;
	};

	$.fn.fancybox.defaults = {
		padding				:	0,
		margin				:	20,
		opacity				:	false,
		modal				:	false,
		cyclic				:	false,
		scrolling			:	'auto',	// 'auto', 'yes' or 'no'

		width				:	600,
		height				:	400,

		autoScale			:	true,
		autoDimensions		:	true,
		centerOnScroll		:	false,

		ajax				:	{},
		swf					:	{ wmode: 'transparent' },

		hideOnOverlayClick	:	true,
		hideOnContentClick	:	false,

		overlayShow			:	true,
		overlayOpacity		:	0.7,
		overlayColor		:	'#666',

		titleShow			:	true,
		titlePosition		:	'outside',	// 'outside', 'inside' or 'over'
		titleFormat			:	null,

		transitionIn		:	'fade',	// 'elastic', 'fade' or 'none'
		transitionOut		:	'fade',	// 'elastic', 'fade' or 'none'

		speedIn				:	300,
		speedOut			:	300,

		changeSpeed			:	300,
		changeFade			:	'fast',

		easingIn			:	'swing',
		easingOut			:	'swing',

		showCloseButton		:	true,
		showNavArrows		:	true,
		enableEscapeButton	:	true,

		onStart				:	null,
		onCancel			:	null,
		onComplete			:	null,
		onCleanup			:	null,
		onClosed			:	null
	};

	$(document).ready(function() {
		fancybox_init();
	});

})(jQuery);



if(typeof deconcept=="undefined"){var deconcept=new Object();}
if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}
if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){
if(!document.createElement||!document.getElementById){return;}
this.DETECT_KEY=_b?_b:"detectflash";
this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
this.params=new Object();
this.variables=new Object();
this.attributes=new Array();
if(_1){this.setAttribute("swf",_1);}
if(id){this.setAttribute("id",id);}
if(w){this.setAttribute("width",w);}
if(h){this.setAttribute("height",h);}
if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion(this.getAttribute("version"),_7);
if(c){this.addParam("bgcolor",c);}
var q=_8?_8:"high";
this.addParam("quality",q);
this.setAttribute("useExpressInstall",_7);
this.setAttribute("doExpressInstall",false);
var _d=(_9)?_9:window.location;
this.setAttribute("xiRedirectUrl",_d);
this.setAttribute("redirectUrl","");
if(_a){this.setAttribute("redirectUrl",_a);}};
deconcept.SWFObject.prototype={setAttribute:function(_e,_f){
this.attributes[_e]=_f;
},getAttribute:function(_10){
return this.attributes[_10];
},addParam:function(_11,_12){
this.params[_11]=_12;
},getParams:function(){
return this.params;
},addVariable:function(_13,_14){
this.variables[_13]=_14;
},getVariable:function(_15){
return this.variables[_15];
},getVariables:function(){
return this.variables;
},getVariablePairs:function(){
var _16=new Array();
var key;
var _18=this.getVariables();
for(key in _18){
_16.push(key+"="+_18[key]);}
return _16;
},getSWFHTML:function(){
var _19="";
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");}
_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";
_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
var _1a=this.getParams();
for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}
var _1c=this.getVariablePairs().join("&");
if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}
_19+="/>";
}else{
if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");}
_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";
_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
var _1d=this.getParams();
for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}
var _1f=this.getVariablePairs().join("&");
if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}
_19+="</object>";}
return _19;
},write:function(_20){
if(this.getAttribute("useExpressInstall")){
var _21=new deconcept.PlayerVersion([6,0,65]);
if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
this.setAttribute("doExpressInstall",true);
this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
document.title=document.title.slice(0,47)+" - Flash Player Installation";
this.addVariable("MMdoctitle",document.title);}}
if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
var n=(typeof _20=="string")?document.getElementById(_20):_20;
n.innerHTML=this.getSWFHTML();
return true;
}else{
if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}
return false;}};
deconcept.SWFObjectUtil.getPlayerVersion=function(_23,_24){
var _25=new deconcept.PlayerVersion([0,0,0]);
if(navigator.plugins&&navigator.mimeTypes.length){
var x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){_25=new deconcept.PlayerVersion(x.description.replace(/([a-z]|[A-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}
}else{try{
var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
for(var i=3;axo!=null;i++){
axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_25=new deconcept.PlayerVersion([i,0,0]);}}
catch(e){}
if(_23&&_25.major>_23.major){return _25;}
if(!_23||((_23.minor!=0||_23.rev!=0)&&_25.major==_23.major)||_25.major!=6||_24){
try{_25=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}
catch(e){}}}
return _25;};
deconcept.PlayerVersion=function(_29){
this.major=parseInt(_29[0])!=null?parseInt(_29[0]):0;
this.minor=parseInt(_29[1])||0;
this.rev=parseInt(_29[2])||0;};
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
if(this.major<fv.major){return false;}
if(this.major>fv.major){return true;}
if(this.minor<fv.minor){return false;}
if(this.minor>fv.minor){return true;}
if(this.rev<fv.rev){return false;}return true;};
deconcept.util={getRequestParameter:function(_2b){
var q=document.location.search||document.location.hash;
if(q){
var _2d=q.indexOf(_2b+"=");
var _2e=(q.indexOf("&",_2d)>-1)?q.indexOf("&",_2d):q.length;
if(q.length>1&&_2d>-1){
return q.substring(q.indexOf("=",_2d)+1,_2e);
}}return "";}};
if(Array.prototype.push==null){
Array.prototype.push=function(_2f){
this[this.length]=_2f;
return this.length;};}
var getQueryParamValue=deconcept.util.getRequestParameter;
var FlashObject=deconcept.SWFObject; // for backwards compatibility
var SWFObject=deconcept.SWFObject;

$.tabs = function(selector, start) {
	$(selector).each(function(i, element) {
		$($(element).attr('tab')).css('display', 'none');
		
		$(element).click(function() {
			$(selector).each(function(i, element) {
				$(element).removeClass('selected');
				
				$($(element).attr('tab')).css('display', 'none');
			});
			
			$(this).addClass('selected');
			
			$($(this).attr('tab')).css('display', 'block');
		});
	});
	
	if (!start) {
		start = $(selector + ':first').attr('tab');
	}

	$(selector + '[tab=\'' + start + '\']').trigger('click');
};

function trimitemail(){
	url="mai"+"lto:of"+"fi"+"ce@"+"teat"+"rulm"+"etro"+"polis."+"ro;";
	location=url;
};

(function($){  

    $.fn.s3Slider = function(vars) {       
        
        var element     = this;
        var timeOut     = (vars.timeOut != undefined) ? vars.timeOut : 4000;
        var current     = null;
        var timeOutFn   = null;
        var faderStat   = true;
        var mOver       = false;
        var items       = $("#" + element[0].id + "Content ." + element[0].id + "Image");
        var itemsSpan   = $("#" + element[0].id + "Content ." + element[0].id + "Image span");
            
        items.each(function(i) {
    
            $(items[i]).mouseover(function() {
               mOver = true;
            });
            
            $(items[i]).mouseout(function() {
                mOver   = false;
                fadeElement(true);
            });
            
        });
        
        var fadeElement = function(isMouseOut) {
            var thisTimeOut = (isMouseOut) ? (timeOut/2) : timeOut;
            thisTimeOut = (faderStat) ? 10 : thisTimeOut;
            if(items.length > 0) {
                timeOutFn = setTimeout(makeSlider, thisTimeOut);
            } else {
                console.log("Poof..");
            }
        }
        
        var makeSlider = function() {
            current = (current != null) ? current : items[(items.length-1)];
            var currNo      = jQuery.inArray(current, items) + 1
            currNo = (currNo == items.length) ? 0 : (currNo - 1);
            var newMargin   = $(element).width() * currNo;
            if(faderStat == true) {
                if(!mOver) {
                    $(items[currNo]).fadeIn((timeOut/6), function() {
                        if($(itemsSpan[currNo]).css('bottom') == 0) {
                            $(itemsSpan[currNo]).slideUp((timeOut/6), function() {
                                faderStat = false;
                                current = items[currNo];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        } else {
                            $(itemsSpan[currNo]).slideDown((timeOut/6), function() {
                                faderStat = false;
                                current = items[currNo];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        }
                    });
                }
            } else {
                if(!mOver) {
                    if($(itemsSpan[currNo]).css('bottom') == 0) {
                        $(itemsSpan[currNo]).slideDown((timeOut/6), function() {
                            $(items[currNo]).fadeOut((timeOut/6), function() {
                                faderStat = true;
                                current = items[(currNo+1)];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        });
                    } else {
                        $(itemsSpan[currNo]).slideUp((timeOut/6), function() {
                        $(items[currNo]).fadeOut((timeOut/6), function() {
                                faderStat = true;
                                current = items[(currNo+1)];
                                if(!mOver) {
                                    fadeElement(false);
                                }
                            });
                        });
                    }
                }
            }
        }
        
        makeSlider();

    };  

})(jQuery);  
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}