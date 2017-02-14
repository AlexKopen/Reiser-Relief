$( document ).ready(function() {
    $('#slide-show .hide-slide').each(function(){
        var ImageUrl = $(this).find('.hidden-image-url').text().trim();
        $(this).find('.hidden-image-url').remove();
        $(this).find('img').attr('src', ImageUrl);
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
