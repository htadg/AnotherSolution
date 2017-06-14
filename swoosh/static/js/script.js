$(document).ready(function(){
  $("#plot").click(function(){
    $.ajax({
      url: '/swoosh/plot/',
      dataTye: 'json',
      success: function(data){
        $("#imagediv").html(data);
      }
    });
  });
  $("#submit").click(function(e) {
    $('.results').text('');
    e.preventDefault();
    if($('#id_your_name').val() == ''){
      $('.results').append("<p>Input can't be empty!</p>");
    }
    else{
      $('#loader').css({'display': 'block'});
      $(':input[type="submit"]').prop('disabled', true);
      $.ajax({
        url: '/swoosh/get_verdict',
        method: 'GET',
        dataTye: 'json',
        data: {'name': $('#id_your_name').val()},
        success: function(result, status){
          var res = result;
          if(status != 'success'){
            $('.results').append('<p>Something crashed!</p>');
          }
          else{
            if(result['status'] != 'SUCCESS'){
              $('.results').append('<p>' + result['comment'] + '</p>');
            }
            else{
              $('.results').append('<p>Report Generated for ' + $('#id_your_name').val() + '</p>');
              var s = '<ol>';
              var stats = result['result'];
              for(var key in stats){
                s += '<li>' + key + ' : ' + stats[key] + '</li>';
              }
              s += '</ol>'
              $('.results').append(s);
              $('.results').append('<a href="#" id="plot">Plot</a>');
              $('.results').append('<div id="imagediv"></div>');
            }
          }
          $('#loader').css({'display': 'none'});
          $(':input[type="submit"]').prop('disabled', false);
        },
        error: function(xhr, status, error){
          $('.results').append('<p>Something crashed!</p>');
          $('#loader').css({'display': 'none'});
          $(':input[type="submit"]').prop('disabled', false);
        }
      });
    }
  });
});
