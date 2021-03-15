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