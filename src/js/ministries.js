$( document ).ready(function() {
   $('.ministry-block').click(function(){
        $('.ministry-block p').attr('id', '');
        $(this).find('p').attr('id', 'current-block');

       var Id = $(this).attr('id');
       var SpecificMinistry = Id.substr(0, Id.indexOf('-'));

        $('.ministry-content-block').css('display', 'none');
        $('.ministry-content-block#' + SpecificMinistry + '-content-block').css('display', 'inline');
   });
});
