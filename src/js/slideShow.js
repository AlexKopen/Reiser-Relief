$( document ).ready(function() {
    $('#slide-show .hide-slide').each(function(){
        var ImageUrl = $(this).text().trim();
        $(this).text('');
        $(this).append('<img src="' + ImageUrl + '">');     
        $(this).css('display', 'inline');
    });

    $('#slide-show .hide-slide').promise().done(function() {
        $('#slide-show').unslider({
            autoplay: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            delay: 6000
        });
    });
});
