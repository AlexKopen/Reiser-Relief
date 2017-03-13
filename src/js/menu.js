$( document ).ready(function() {
    $('#drop-down-menu').on('click', function() {
        $('header ul').toggle();
    });

    $(window).on('resize', function() {
        if (!Modernizr.mq('(max-width: 768px)')) {
            $('header ul').css('display', 'block');
        }
    });
});
