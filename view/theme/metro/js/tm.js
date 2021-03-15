/*
// +----------------------------------------+
// + javascript/tm.js                    +
// +----------------------------------------+
*/
(function () {
    var j = {
        getItem: function (a) {
            return !a || !this.hasItem(a) ? null : unescape(document.cookie.replace(RegExp("(?:^|.*;\\s*)" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"))
        },
        setItem: function (a, c, d, e, h, f) {
            if (a && !/^(?:expires|max\-age|path|domain|secure)$/i.test(a)) {
                var g = "";
                if (d) switch (d.constructor) {
                case Number:
                    g = Infinity === d ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + d;
                    break;
                case String:
                    g = "; expires=" + d;
                    break;
                case Date:
                    g = "; expires=" + d.toGMTString()
                }
                document.cookie = escape(a) + "=" + escape(c) + g + (h ? "; domain=" + h : "") + (e ? "; path=" + e : "") + (f ? "; secure" : "")
            }
        },
        removeItem: function (a, c) {
            a && this.hasItem(a) && (document.cookie = escape(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (c ? "; path=" + c : ""))
        },
        hasItem: function (a) {
            return RegExp("(?:^|;\\s*)" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
        }
    },
        a = {
            window_width: null,
            window_height: null,
            widget_preview: null,
            widget_sidebar: null,
            widgets: null,
            widget_scroll_container: null,
            widget_containers: null,
            widget_open: !1,
            dragging_x: 0,
            left: 90,
            widget_page_data: [],
            is_touch_device: !1,
            title_prefix: "App TM - ",
            init: function () {
                a.is_touch_device = "ontouchstart" in document.documentElement ? !0 : !1;
                a.cacheElements();
                a.Events.onWindowResize();
                $(window).bind("resize", a.Events.onWindowResize).bind("hashchange", a.Events.onHashChange);
                $(document).click(a.Events.onClick);
                a.widget_sidebar.children("div").children("div").click(a.Events.sidebarClick);
                a.is_touch_device ? $(document.body).addClass("touch") : $(document).mousedown(a.Events.onMouseDown).mouseup(a.Events.onMouseUp).mousemove(a.Events.onMouseMove);
                if ("" !== window.location.hash) {
                    var b = window.location.hash.replace(/[#!\/]/g, ""),
                        b = a.widgets.filter('[data-name="' + b + '"]');
                    b.length && a.openWidget(b)
                }
                $(document.body).addClass("loaded");
                a.widgets.each(function (a) {
                    var b = $(this);
                    setTimeout(function () {
                        b.removeClass("unloaded");
                        setTimeout(function () {
                            b.removeClass("animation")
                        }, 300)
                    }, 100 * a)
                })
            },
            Events: {
                onWindowResize: function () {
                    a.window_width = $(window).width();
                    a.window_height = $(window).height()
                },
                onHashChange: function (b) {
                    var c = window.location.hash,
                        d = c.replace(/[#!\/]/g, ""),
                        e = function () {
                            var b = $('div.widget[data-name="' + d + '"]');
                            b.length && a.openWidget(b)
                        };
                    a.widget_open ? "" === c ? a.closeWidget(b) : a.widget_open.data("name") !== d && e() : "" !== c && e()
                },
                onMouseDown: function (b) {
                    a.widget_open || (a.dragging_x = b.clientX)
                },
                onClick: function (b) {
                    b = $(b.target);
                    b.hasClass("widget") ? a.openWidget(b) : b.parents("div.widget").length && a.openWidget(b.parents("div.widget"))
                },
                sidebarClick: function (b) {
                    switch ($(b.target).attr("class")) {
                    case "cancel":
                        a.closeWidget(b);
                        break;
                    case "refresh":
                        a.refreshWidget(b);
                        break;					
                    }
                }
            },
            cacheElements: function () {
                a.widgets = $("div.widget");
                a.widget_containers = $("div.widget_container");
                a.widget_scroll_container = $("#widget_scroll_container");
                a.widget_preview = $("#widget_preview");
                a.widget_sidebar = $("#widget_sidebar");
            },
            openWidget: function (b) {
				$.get('/start/ajaxemu', function(user) {
					var data = jQuery.parseJSON(user); 
					var theme = data.options.theme;
				
				
                var c = b.data("name"),
                    d = b.data("link");
                d && "" !== d ? window.open(d, "_blank") : $.trim(b.data("url")).length && (a.widget_open = b, window.location.hash = "#!/" + c, document.title = a.title_prefix + c, $("#widget_preview_content").remove(), a.widget_preview.addClass("open "+theme), a.widget_scroll_container.hide(), a._loadWidget(b));
                "undefined" !== typeof _gaq && _gaq.push(["_trackPageview", "#" + c]);
				});
            },
            closeWidget: function () {
                window.location.hash = "";
                document.title = a.title_prefix + "Start";
                a.widget_scroll_container.show();
                a.widget_preview.removeClass("open");
                a.widget_open = !1;
                setTimeout(function () {
                    $("#widget_preview_content").remove()
                }, 300)
            },
            refreshWidget: function () {
                a._loadWidget(a.widget_open, !1)
            },
            previousWidget: function (b) {
                var c = a.widget_open.prev();
                c.length || (c = a.widget_open.parent().children("div.widget").last());
                var d = c.data("url");
                d && "" !== d ? a.openWidget(c) : (a.widget_open = c, a.previousWidget(b))
            },
            nextWidget: function (b) {
                var c = a.widget_open.next();
                c.length || (c = a.widget_open.parent().children("div.widget").first());
                var d = c.data("url");
                d && "" !== d ? a.openWidget(c) : (a.widget_open = c, a.nextWidget(b))
            },
            _loadWidget: function (b, c) {
                var d = b.data("name"),
                    e = function (b) {
                        var c = $("#widget_preview_content");
                        c.length ? c.html(b) : c = $("<div>").attr("id", "widget_preview_content").insertAfter(a.widget_sidebar).html(b);
                        "true" !== j.getItem("melonhtml5_metro_ui_sidebar_first_time") && (a.widget_sidebar.addClass("open"), a.widget_sidebar.mouseenter(function () {
                            j.setItem("melonhtml5_metro_ui_sidebar_first_time", "true");
                            $(this).removeClass("open")
                        }))
                    },
                    h = (new Date).getTime();
                a.widget_preview.children("div.dot").remove();
                for (var f = 1; 7 >= f; f++) $("<div>").addClass("dot").css("transition", "right " + (0.6 + f / 10).toFixed(1) + "s ease-out").prependTo(a.widget_preview);
                var g = function () {
                        var a = $("div.dot");
                        a.length && (a.toggleClass("open"), setTimeout(g, 1300))
                    },
                    k = function (b) {
                        var c = (new Date).getTime() - h;
                        1300 < c ? (a.widget_preview.children("div.dot").remove(), "undefined" !== typeof b && b()) : setTimeout(function () {
                            a.widget_preview.children("div.dot").remove();
                            "undefined" !== typeof b && b()
                        }, 1300 - c)
                    };
                a.widget_preview.width();
                g();
                "undefined" === typeof c && (c = !0);
                c && void 0 !== a.widget_page_data[d] ? k(function () {
                    e(a.widget_page_data[d])
                }) : (f = $.trim(b.data("url")), 0 < f.length && $.ajax({
                    url: f,
                    cache: !1,
                    type: "POST",
                    data: {},
                    beforeSend: function () {},
                    complete: function () {},
                    error: function () {},
                    success: function (b) {
                        k(function () {
                            a.widget_page_data[d] = b;
                            e(b)
                        })
                    }
                }))
            }
        };
    $(document).ready(a.init)
})();


/*
// +----------------------------------------+
// + javascript/website.js                  +
// +----------------------------------------+
*/
function loadapp(url, name, theme){
	$('#loadapp').data('url', url);
	$('#loadapp').data('name',name);
	$('#loadapp').data('theme',theme);
	$("#loadapp").click();
}
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
function rgba2hex(r, g, b) {
	if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
$(document).ready(function () {

	$.get('/start/ajaxemu', function(user) {
		var data = jQuery.parseJSON(user); 
		$('body').addClass(data.options.theme);
		$('div.widget_container').addClass(data.options.theme);
	});
    var colour_array = ['grey','red','blue'];
    var header_html = '';
    header_html += '<div id="settings"><h2></h2>';
    header_html += '</div>';
    header_html += '<div id="theme_picker">';
    header_html += '<span>Setari Aspect</span>';
	if(usertheme=='red'){
			header_html += '<div class="selected">';
	} else {
			header_html += '<div>';
	}

	header_html += '<div class="square red" data-theme="red" data-color="245,33,33"></div>';
	header_html += '<label class="text_shadow">Rosu</label>';
	header_html += '</div>';
	if(usertheme=='blue'){
			header_html += '<div class="selected">';
	} else {
			header_html += '<div>';
	}
	header_html += '<div class="square blue" data-theme="blue" data-color="16,149,180"></div>';
	header_html += '<label class="text_shadow">Turcoaz</label>';
	header_html += '</div>';		
	if(usertheme=='grey'){
			header_html += '<div class="selected">';
	} else {
			header_html += '<div>';
	}
	header_html += '<div class="square grey" data-theme="grey" data-color="117,117,117"></div>';
	header_html += '<label class="text_shadow">Gri</label>';
	header_html += '</div>';	


    header_html += '</div>';
	 header_html += '<div class="actions"><i class="fa fa-cog"></i><i class="fa fa-arrows-alt" onclick="fullscreen();"></i><a href="/start/logout"><i class="fa fa-power-off"></i></a></div>';

    $('<header>').html(header_html).prependTo($(document.body));

    var settingClick = function () {
            $(document.body).toggleClass('open');
        };

    var themeClick = function (e) {
            var theme = $(this).children('div.square').attr('class');
            $.each(colour_array, function (index, value) {
                $('div.widget_container').removeClass(value);
				$('body').removeClass(value);
            });

            if (theme !== 'default') {
                $('div.widget_container').addClass(theme);
				var reload = $('body');
				reload.fadeOut(100, function () {
					$('body').addClass(theme);
					reload.fadeIn(100);
				});			
            }
			var template  = $(this).children('div.square').data('theme');
			var template_color  = $(this).children('div.square').data('color');
			var options = new Array();
			options[0] = template;  
			options[1] = template_color;  
			set_options(options);
            $('#theme_picker').children('div.selected').removeClass('selected');
            $(this).addClass('selected');
        };

    $('#theme_picker').children('div').click(themeClick)
    $('#settings h2').click(settingClick);
	$.get('/start/ajaxemu', function(user) {
		var data = jQuery.parseJSON(user);
		if(!data.avatar){
		$('#settings h2').html(data.email+'<span><i style="right:5px;position:absolute;font-size:40px;top:5px;" class="fa fa-user"></i></span>');
		} else {
		$('#settings h2').html(data.email+'<span class="icon" style="background-image:url('+data.avatar+');"></span>');
		}
	});
});
function set_options(options){
	$.post("/start/options", { options: options}, function(data){
		 location.reload();
	});
}
function zoomimage(img, title){
		if(!title){
			var dtitle= '&nbsp;';
		} else {
			var dtitle= title;
		}
		$.Dialog({
			'title'      : '<h1>'+dtitle+'</h1>',
			'content'    : '<img class="zoom" />',
			'draggable'  : true,
			'closeButton': false,
			'position'   : {
			'offsetY'   : '10px'
			},
			'buttons'    : {
				'Inchide'     : {
				'cssclass': 'close'
				}
			}
		});
		if(title){
			var z =  $('.dialog .header').width();
			$('img.zoom').attr('src', '/apps/data/'+img+'&w='+z+'&h='+z);
		} else {
			$('img.zoom').attr('src', '/apps/data/'+img);
		}						
}
function loadscroller(div){
	var scroll = $(window).height();
	$(div).height(scroll-225);
	$(div).mCustomScrollbar({
		scrollInertia:400,
		autoDraggerLength:false,
		scrollButtons:{
		enable:true
		},
		theme:"light-thin"
	});	
}
function fullscreen(){
		var el = document.documentElement
		, rfs = // for newer Webkit and Firefox
			   el.requestFullScreen
			|| el.webkitRequestFullScreen
			|| el.mozRequestFullScreen
			|| el.msRequestFullScreen
		;
		if(typeof rfs!="undefined" && rfs){
		  rfs.call(el);
		} else if(typeof window.ActiveXObject!="undefined"){
		  // for Internet Explorer
		  var wscript = new ActiveXObject("WScript.Shell");
		  if (wscript!=null) {
			 wscript.SendKeys("{F11}");
		  }
		}
}
function editeaza(id, url) {
	$.post("/"+url, {id_editeaza: id})
		.done(function(data) {
		if(data) {
			$('#widget_preview_content').html(data);
		}
	}); 
}

function replace_sala_name(sala_nume, sala_id) {
	$("#nume_sala").html("<div class='input-control text'><input type='text' name='nume' value='"+sala_nume+"'/></div><i class='icon-checkmark' onclick='salveaza_nume("+sala_id+");'></i><i class='icon-cancel-2' onclick='anuleaza_salvare_nume(\""+sala_nume+"\", \""+sala_id+"\");'></i><i class='icon-plus' onClick=''></i><i class='icon-checkmark2'></i>");
	$("input[name=nume]").focus();
}

function salveaza_nume(sala_id) {
	var sala_nume=$("input[name=nume]").val();
	$.post("/sala/sala_edit", {sala_nume: sala_nume, sala_id: sala_id})
		.done(function(data) {
		$("#nume_sala").html(sala_nume+"<i class='icon-pencil' onclick='replace_sala_name(\""+sala_nume+"\", \""+sala_id+"\");'></i><i class='icon-plus' onClick=''></i><i class='icon-checkmark2'></i>");
	}); 
}

function anuleaza_salvare_nume(sala_nume, sala_id) {
	$("#nume_sala").html(sala_nume+"<i class='icon-pencil' onclick='replace_sala_name(\""+sala_nume+"\", \""+sala_id+"\");'></i><i class='icon-plus' onClick=''></i><i class='icon-checkmark2'></i>");
}

function table(id) {
	var oTable = $('#'+id).dataTable( {
		"bFilter": false,
		"bPaginate": false,
		"bInfo": false,
		"aaSorting": [],
		"oLanguage": {
			"sSearch": "Search all columns:",
			"sEmptyTable":   "Nu este nici un rand adaugat"
		}
	} ); 
				
	$("tfoot input").keyup( function () {
		/* Filter on the column (the index) of this element */
		oTable.fnFilter( this.value, $("tfoot input").index(this) );
	} ); 
				
				
				
	/*
	 * Support functions to provide a little bit of 'user friendlyness' to the textboxes in 
	 * the footer
	 */
	$("tfoot input").each( function (i) {
		asInitVals[i] = this.value;
	} );
				
	$("tfoot input").focus( function () {
		if ( this.className == "search_init" )
		{
			this.className = "";
			this.value = "";
		}
	} );
				
	$("tfoot input").blur( function (i) {
		if ( this.value == "" )
		{
			this.className = "search_init";
			this.value = asInitVals[$("tfoot input").index(this)];
		}
	} );
	
	
	$('#'+id).tableDnD({
		 onDrop: function(table, row) {
            var rows = table.tBodies[0].rows;
            var debugStr = "";
            for (var i=0; i<rows.length; i++) {
                debugStr += rows[i].id+" ";
            }
		}

	});
	
}

function append_rand(nume_tabel) {

	var nr_randuri=$("#nr_randuri").val();
	nr_randuri=parseInt(nr_randuri);
	nr_randuri+=1;
	if (nr_randuri%2 == 0) {
		var numar='odd';
	} else {
		var numar='even';
	}
	
	$('#'+nume_tabel).find('tbody:last').append("<tr class='gradeA "+numar+"' id='randa"+nr_randuri+"'><td class='center  sorting_1'><input type='checkbox' checked='checked' name='activ' id='activ"+nr_randuri+"'></td><td class='center'><input type='text' value='' name='nume' id='nume"+nr_randuri+"'></td><td class='center'><input type='text' style='width: 30px;' value='' name='locuri' id='locuri"+nr_randuri+"'></td></tr>");
	$("#nume"+nr_randuri).focus();
	$("#nr_randuri").val(nr_randuri);
	
	$('#'+nume_tabel).tableDnD({
		 onDrop: function(table, row) {
            var rows = table.tBodies[0].rows;
            var debugStr = "";
            for (var i=0; i<rows.length; i++) {
                debugStr += rows[i].id+" ";
            }
		}

	});
}

function check(sector_id, sala_id, url, sala_nume) {
	var ordine=$("#ordine_randuri").text();
		
	var nr_randuri=$("#nr_randuri").val();
	nr_randuri=parseInt(nr_randuri);
	var inputs_values = $(":input").serializeArray();
	
	checka=0;
	for(i=0; i<=nr_randuri; i++) {
		if($("#activ"+i).is(':checked')) {
			
			var nume_rand=$("#nume"+i).val();
			var nume_locuri=$("#locuri"+i).val();
		
			if (typeof nume_rand === 'undefined' || typeof nume_locuri === 'undefined' || nume_rand=='' || nume_locuri=='' || nume_locuri=='0') {
				checka=1;
			}
			if(nume_locuri!='' && isNaN(nume_locuri)) {
				checka=1;
			}
		}
	}		
	
	if(checka>0) {
		$(".eroare").show();
		$.Dialog.show();
		
	} else {
		$.Dialog.close();
		
		 $.post("/"+url, {sala_id: sala_id, sector_id:sector_id, inputs_values:inputs_values})
			.done(function(data) {
				//$('#widget_preview_content').html(data);
				//loadapp("/sala/sala_edit/"+sala_id, sala_nume, "red");
				$(".refresh").trigger('click');
			});  
		//return false;	
	}

}

function adauga_sector(sala_id, url, sala_nume) {
	var nume_sector=$("#nume_sector_add").val();
	var nr_randuri=$("#nr_randuri").val();
	nr_randuri=parseInt(nr_randuri);
	
	var inputs_values = $(":input").serializeArray();
	
	checka=0;
	 for(i=0; i<=nr_randuri; i++) {
	
		if($("#activ"+i).is(':checked')) {
			
			var nume_rand=$("#nume"+i).val();
			var nume_locuri=$("#locuri"+i).val();
		
			if (typeof nume_rand === 'undefined' || typeof nume_locuri === 'undefined' || nume_rand=='' || nume_locuri=='' 
			|| nume_locuri=='0' || typeof nume_sector=== 'undefined' || nume_sector=='') {
				checka=1;
			}
			if(nume_locuri!='' && isNaN(nume_locuri)) {
				checka=1;
			}
		}
	} 		
	
	if(checka>0) {
		$(".eroare").show();
		$.Dialog.show();
		
		
	} else {
		$.Dialog.close();
		
		
		 $.post("/"+url, {sala_id: sala_id,  inputs_values:inputs_values, nume_sector: nume_sector})
			.done(function(data) {
				//$('#widget_preview_content').html(data);
				
				//loadapp("/sala/sala_edit/"+sala_id, sala_nume, "red");
				$(".refresh").trigger('click');
			});   
		return false;	
	}
	
	
}

function sectoare_del(url, sala_nume, sala_id) {
	var ids='';
	$(":checkbox").each(function(index, element){
	  if(!element.checked){
			ids+="+"+this.id;
	  } 
	});
	var ordine=$("#ordine").text();
	if(ids!='') {
		$.Dialog({
			'title'      : 'Stergere sectoare',
            'content'    : 'Sunteti siguri ca doriti stergerea sectoarelor debifate?',
            'buttons'    : {
				'Ok'    : {
					'action': function() {
						$.post("/"+url, {ids: ids, ordine:ordine})
							.done(function(data) {
							$(".refresh").trigger('click');
							//$('#widget_preview_content').html(data);
						});
					}
                 },
				'Anuleaza'     : {
					'action': function() {}
                }
            }
       }); 
				
	   $(".header").css({"background-color":color, "border":"1px solid" + color});
	 
	} else {
		$.post("/"+url, {ordine:ordine})
			 .done(function(data) {
			$(".refresh").trigger('click');
		 });
	}
}

function sala_noua(url) {
	var nume_sala=$("#nume_sala_add").val();
	
	if(nume_sala=="") {
		$(".eroare").show();
		$.Dialog.show();
	} else {
		$.post("/"+url, {nume_sala: nume_sala})
			.done(function(data) {
				var sala_id=data;
				
			//$('#widget_preview_content').html(data);
			loadapp("/sala/sala_edit/"+sala_id, nume_sala, "red");
			
		});
	}
}