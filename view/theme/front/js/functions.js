/* =========================================================================================== 
SLIDER FUNCTION  -----------------------------------------------------------------------------
============================================================================================== */
    var quotes = $(".text-slide");
    var quoteIndex = -1;

    function sliderQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500, sliderQuote);
    }


function renderMap()
    {
      if( $('#map').length > 0 ){
          var point = new google.maps.LatLng(44.447254, 26.108714);
          var map = new google.maps.Map(document.getElementById('map'),
          {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 16,
            center: point,
            scrollwheel: false,
          });
          var marker = new google.maps.Marker(
          {
            position: point,
            map: map
          });
        }
    }
