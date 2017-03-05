$( document ).ready(function() {
    $('#slide-show .hide-slide').each(function(){
        var HiddenImageUrlSelector = $(this).find('.hidden-image-url');
        var HiddenImageUrl = HiddenImageUrlSelector.text().trim();
        HiddenImageUrlSelector.remove();
        $(this).find('img').attr('src', HiddenImageUrl);
        $(this).css('display', 'list-item');
    });

    $('#slide-show .hide-slide').promise().done(function() {
        $('#slide-show .container').unslider({
            autoplay: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            delay: 6000
        });
    });
});
