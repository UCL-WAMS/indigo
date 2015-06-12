define(['jquery'],function($){
  var sw = document.body.clientWidth,
      bp = 768,
      $map = $('.map');
  var staticImgSrc = "http://maps.googleapis.com/maps/api/staticmap?center=UCL+London&zoom=15&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:red%7Clabel:1%7CUCL+London";
  var embed = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2482.381675019576!2d-0.13404!3d51.524559!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2f69173579%3A0xd008c67faecc133e!2sUniversity+College+London!5e0!3m2!1sen!2suk!4v1425299272009" frameborder="0" style="border:0"></iframe>';

  function buildMap() {
    if(sw>=bp) { //If Large Screen
        if($('.map-container').length < 1) { //If map doesn't already exist
          buildEmbed();
        }
    } else {
        if($('.static-img').length < 1) { //If static image doesn't exist
          buildStatic();
        }
    }
  };

  function buildEmbed() { //Build iframe view
      $('<div class="map-container"/>').html(embed).prependTo($map);
  };
    
  function buildStatic() { //Build static map
     var mapLink = $('.map-link').attr('href'),
         $img = $('<img class="static-img" />').attr('src',staticImgSrc);
     $('<a/>').attr('href',mapLink).html($img).prependTo($map); 
  }

  $(window).resize(function() {
    sw = document.body.clientWidth;
    buildMap();
    google.maps.event.trigger(map, "resize");
  });

  $(document).ready(function(){
    buildMap();
  });
});