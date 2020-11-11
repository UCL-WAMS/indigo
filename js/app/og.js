define(['jquery'], function($) {
  $( document ).ready(function() {
    $('ucl-widget').each(function() {
      var widget = $(this);
      var widgetUrl = widget.attr('url');
      var widgetType = widget.attr('type');

      widget.html('');
      $.ajax({url: Drupal.settings.basePath + "ucl-widgets?url=" + encodeURIComponent(widgetUrl) + '&type=' + encodeURIComponent(widgetType), success: function(result){
          $.when(widget.html(result))
            .then(function(){
              widget.find('form input[name="LOCAL_BASE"] ').val(widget.data('lssba'));
              widget.find('form input[name="collection_id"] ').val(widget.data('lsscid'));
            });
        }});
    });
  });
});
