jQuery(document).ready(function($){
	$('.contact_form input, .contact_form textarea').on( 'keyup keydown', function(){
		$(this).parent().removeClass("has-error").removeClass("has-success");
		
		var name = $(this).attr("name");
		var value = $(this).val();
		
		if( name == "name"){
			if( value.length < 2 || value == "" ){
				$(this).parent().addClass("has-error");
			}
			else{
				$(this).parent().addClass("has-success");
			}
		}
		
		else if( name == "email" ){
			var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if( value == "" || !email_regex.test(value) ){
				$(this).parent().addClass("has-error");
			}
			else{
				$(this).parent().addClass("has-success");
			}
		}
		
		else if( name == "message" ){
			if( value.length < 3 || value == "" ){
				$(this).parent().addClass("has-error");
			}
			else{
				$(this).parent().addClass("has-success");
			}			
		}
		
		else if( name == "phone" ){
			var phone_regex = /^\d+$/;
			if( value == "" || !phone_regex.test(value) ){
				$(this).parent().addClass("has-error");
			}
			else{
				$(this).parent().addClass("has-success");
			}		
		}
	});	

	$('.submitform').click(function(e){
		e.preventDefault();
		
		var form = $('.contact_form');
		
		var name = $('input[name="name"]').val();
		var email = $('input[name="email"]').val();
		var phone = $('input[name="phone"]').val();
		var message = $('textarea[name="message"]').val();

		$('input[name="name"]').parent().removeClass("has-error").removeClass("has-success");
		$('input[name="email"]').parent().removeClass("has-error").removeClass("has-success");
		$('input[name="phone"]').parent().removeClass("has-error").removeClass("has-success");
		$('textarea[name="message"]').parent().removeClass("has-error").removeClass("has-success");
		
		var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var phone_regex = /^\d+$/;
		
		if( name == "" || name.length < 2 ){
			$('input[name="name"]').parent().addClass("has-error");
		}
		if( email == "" ){
			$('input[name="email"]').parent().addClass("has-error");
		}	
		if( phone == "" ){
			$('input[name="phone"]').parent().addClass("has-error");
		}
		if( message == "" || message.length < 3 ){
			$('textarea[name="message"]').parent().addClass("has-error");
		}
		
		if( name !== "" && email !== "" && message !== "" && phone !== ""){
			if( email_regex.test(email) === true && phone_regex.test(phone) === true ){
				$('input[name="name"]').parent().removeClass("has-error").addClass("has-success");
				$('input[name="email"]').parent().removeClass("has-error").addClass("has-success");
				$('input[name="phone"]').parent().removeClass("has-error").addClass("has-success");
				$('textarea[name="message"]').parent().removeClass("has-error").addClass("has-success");
			
				$.post(
					form.attr('action'),
					{
						name:name,
						email:email,
						message:message,
						phone: phone
					},
					function(response){
						if( response.indexOf("[OK]") !== -1 ){
							$('.send_result').hide();
							$('.send_result').html('<p>Message sent, we will respond as soon as we can.</p>');
							$('.send_result').fadeIn();
						}
						else{						
							$('.send_result').hide();
							$('.send_result').html('<p>Message failed to sent.</p>');
							$('.send_result').fadeIn(200);
						}
					}
				);
			}
			else if( !email_regex.test(email) ) {
				$('input[name="email"]').parent().addClass("has-error");
			}
			else if( !phone_regex.test(email) ) {
				$('input[name="phone"]').parent().addClass("has-error");
			}
		}
	});	

	$(".newsletter_form input").on( 'keyup keydow', function(){
		
		$(this).parent().removeClass("has-error").removeClass("has-success");
		
		var name = $(this).attr("name");
		var value = $(this).val();
		
		var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if( value == "" || !email_regex.test(value) ){
			$(this).parent().addClass("has-error");
		}
		else{
			$(this).parent().addClass("has-success");
		}
	});

	$(".send_newsletter").click(function(e){
		e.preventDefault();
		var form = $(".newsletter_form");
		var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var email = $('input[name="email_news"]').val();
		
		$('input[name="email_news"]').parent().removeClass("has-error").removeClass("has-success");
		
		if( email !== "" && email_regex.test(email) ){
			$('input[name="email_news"]').parent().removeClass("has-error").addClass("has-success");
		
			$.post(
				form.attr('action'),
				{
					email:email,
				},
				function(response){
					if( response.indexOf("[OK]") !== -1 ){
						form.fadeOut( 200, function(){
                            $('.subscribe-heading').fadeOut(200);
							$('.send_result_news').hide();
							$('.send_result_news').html('<p>You have subscribed to newsletters.</p>');
							$('.send_result_news').fadeIn();
						});
					}
					else{						
						$('.send_result_news').hide();
						$('.send_result_news').html('<p>Failed to subscribe you.</p>');
						$('.send_result_news').fadeIn(200);
					}
				}
			)
		}
		else{
			$('input[name="email_news"]').parent().addClass("has-error");
		}
		
	});
});