/* Begin Of jQuery or JS Custom Scripts - This line of codemust stay intact */
jQuery(document).ready(function ($) { 
  "use strict";

/*************************************/
/************ CUSTOM JS **************/
/*************************************/

/* TABLE OF CONTENTS *****************

Here you can find name and line of each 
section of JS code for this theme:

	1. (line )
	2. (line )
	
*/

/* =========================================================================================== 
QUERY LOADER SETTINGS  -------------------------------------------------------------------
============================================================================================== */

/*     window.addEventListener('DOMContentLoaded', function ()
    {
      $("body").queryLoader2(
        {
          deepSearch: true,
          percentage: true,
          barHeight: 5,
          completeAnimation: "grow",
          minimumTime: 2000,
        
        });
    }); */

/* =========================================================================================== 
SLIDER SETTINGS  ------------------------------------------------------------------------------
============================================================================================== */
sliderQuote();


$('.quotes').flexslider({
    animation: "slide",
    slideshow: false
});
 
$(window).resize(function() {
    $('#home').height($(window).height());
});

$(window).trigger('resize');

/* 
$("#home").backstretch(
	"/view/theme/front/images/sala.jpg"
); */


/* =========================================================================================== 
YT PLAYER  -----------------------------------------------------------------------------------
============================================================================================== */
$(function(){
    $(".player").mb_YTPlayer();
});

$(".fit-vids").fitVids();

/* =========================================================================================== 
WORKS SETTINGS  ------------------------------------------------------------------------------
============================================================================================== */
var $container = $('.work-items');

  $container.isotope({
    resizable: false, 
    itemSelector : '.item'
  });
        
  var $optionSets = $('#options .option-set'),
      $optionLinks = $optionSets.find('a');

  $optionLinks.click(function(){
    var $this = $(this);
    if ( $this.hasClass('selected') ) {
      return false;
    }
    var $optionSet = $this.parents('.option-set');
    $optionSet.find('.selected').removeClass('selected');
    $this.addClass('selected');

    var options = {},
        key = $optionSet.attr('data-option-key'),
        value = $this.attr('data-option-value');
    value = value === 'false' ? false : value;
    options[ key ] = value;
    if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
      changeLayoutMode( $this, options );
    } else {
      $container.isotope( options );
    }
    return false;
  });

  // Project Expander
  var loader = $('.item-expander');
  
  $('.expander').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var url = $(this).attr('href');
		$("section[id!='program']").fadeOut(400);
		$("#navigation-sticky-wrapper").hide(0);
		$("footer").hide(0);
		$(".promo-break").hide(0);
		$(".buy-break").hide(0);
		$(".scroll-to-top").hide(0);
    loader.slideUp(function(){
      $.get(url, function(data){
        var portfolioContainer = $('#timeline');
        var topPosition = portfolioContainer.offset().top;
        var bottomPosition = topPosition + portfolioContainer.height();
        $('html,body').delay(600).animate({ scrollTop: topPosition });
        var container = $('#item-expander>div', loader);
        
        container.html(data);
        $(".fit-vids").fitVids();
        $('.project').flexslider({
          animation: "fade",
          selector: ".project-slides .slide",
          controlNav: true,
          directionNav: true ,
          slideshowSpeed: 5000,  
            });
        
      //   container.fitVids();
        loader.slideDown(function(){
          if(typeof keepVideoRatio == 'function'){
            keepVideoRatio('.project-video > iframe');
          }
        }).delay(1000).animate({opacity:1}, 200);
      });
    });
  });
    
    $('.close', loader).on('click', function(){
		var id = $(this).attr('id');
	if(id=='shop'){
			disconnect(loader);
	} else {
      loader.delay(300).slideUp(function(){
        var container = $('#item-expander>div', loader);
        container.html('');
        $(this).css({opacity:0});
		$("section[id!='program']").fadeIn(400);
		$("#navigation-sticky-wrapper").fadeIn(400);
		$("li a#program").click();
		$("footer").show(0);
		$(".promo-break").show(0);
		$(".buy-break").show(0);
		$(".scroll-to-top").show(0);		
        
      });
      var portfolioContainer = $('#timeline');
	  if(typeof portfolioContainer!=='object'){
        var topPosition = portfolioContainer.offset().top;
        var bottomPosition = topPosition - portfolioContainer.height();
        $('html,body').delay(0).animate({ scrollTop: bottomPosition - 300});
		}
		}
    });
	

/* =========================================================================================== 
MAGNIFIC POPUP SETTINGS  ---------------------------------------------------------------------
============================================================================================== */
$('.image-link').magnificPopup({
 type:'image',
 mainClass: 'mfp-with-zoom', // this class is for CSS animation below

  zoom: {
    enabled: true, // By default it's false, so don't forget to enable it

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function 

    // The "opener" function should return the element from which popup will be zoomed in
    // and to which popup will be scaled down
    // By defailt it looks for an image tag:
    opener: function(openerElement) {
      // openerElement is the element on which popup was initialized, in this case its <a> tag
      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
      return openerElement.is('img') ? openerElement : openerElement.find('img');
    }
  }
});

/* =========================================================================================== 
TWITTER SETTINGS  ----------------------------------------------------------------------------
============================================================================================== */
 $(".ticker").tweet({
          username: "banesdesign",
          modpath: './twitter/', // here is modpath
          avatar_size: 0,
          count: 20,
          loading_text: ""
        }).bind("loaded", function() {
          var ul = $(this).find(".tweet_list");
          var ticker = function() {
            setTimeout(function() {
              ul.find('li:first').animate( {marginTop: '-75px'}, 500, function() {
                $(this).detach().appendTo(ul).removeAttr('style');
              });
              ticker();
            }, 8000);
          };
          ticker();
        });

 $(this).find(".tweet_list").list_ticker({
                speed: 5000,
                effect: 'fade' // fade, slide
        });

/* =========================================================================================== 
MAP SETTINGS  ----------------------------------------------------------------------------
============================================================================================== */
renderMap();

/* =========================================================================================== 
NAVIGATION SETTINGS  -------------------------------------------------------------------------
============================================================================================== */

    $("#navigation").sticky({
        className: 'is-sticky stucked',
        topSpacing: 0
    });


  
  /* ==============================================
Smooth scrolling to anchor 
with offsetting an anchor to adjust for fixed header
=============================================== */

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
& location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50 //offsets for fixed header
        }, 1500,  'easeInOutCirc');
        return false;
      }
    }
  });
  //Executed on page load with URL containing an anchor tag.
  var anchor = location.href.split("#")[1];
  if(anchor) anchor = anchor[0] == "/" ? anchor.substring(1) : anchor;
  if(anchor && anchor.indexOf('/') == -1) {
      var target = $('#' + anchor);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70 //offset height of header here too.
        }, 1500);
        return false;
      }
    }
});

$('.scroller').click(function(){
    $('.scroller').removeClass('active');
    $(this).addClass('active');
    return false;
  });

  /**
   * Window Scroll Functions
   */
  $(window).scroll(function(){
    
    $('.scroller').each(function(){
      var scrollHref = $(this).attr('href');
      if( $(window).scrollTop() > $(scrollHref).offset().top - 240 ) {
        $('.scroller').removeClass('active');
        $(this).addClass('active');
      }
    });
  });

/* =========================================================================================== 
WOW ANIMATE SETTINGS  ------------------------------------------------------------------------
============================================================================================== */
new WOW().init();

/* =========================================================================================== 
BLOG IMAGE SLIDER SETTINGS  ------------------------------------------------------------------
============================================================================================== */
$('.blog-image').flexslider({
          animation: "fade",
          selector: ".blog-slides > li",
          controlNav: true,
          directionNav: true ,
          slideshowSpeed: 5000,  
            });

$('.blog-single').flexslider({
          animation: "fade",
          selector: ".blog-single-slides > li",
          controlNav: false,
          directionNav: false ,
          slideshowSpeed: 5000,  
            });


/* End Of jQuery or JS Custom Scripts - This line of code must stay intact */
});