var slideShow = (function() {
    'use strict';

    function displayImages(){
        $('#slide-show .hide-slide').each(function(){
            var HiddenImageUrlSelector = $(this).find('.hidden-image-url');
            var HiddenImageUrl = HiddenImageUrlSelector.text().trim();
            HiddenImageUrlSelector.remove();
            $(this).find('img').attr('src', HiddenImageUrl);
            $(this).css('display', 'list-item');
        });
    }

    function startSlideShow() {
        $('#slide-show .hide-slide').promise().done(function() {
            $('#slide-show .container').unslider({
                autoplay: true,
                infinite: true,
                arrows: false,
                speed: 1000,
                delay: 600000
            });
        });
    }

    function windowResize() {
        $('.unslider-horizontal').height($('.unslider-active img').height());
        $(window).on('resize', function() {
            $('.unslider-horizontal').height($('.unslider-active img').height());
        });
    }

    function init() {
        displayImages();
        startSlideShow();
        windowResize();
    }

    var slideShowModule = {
        init: init
    }

    return slideShowModule;

})();
