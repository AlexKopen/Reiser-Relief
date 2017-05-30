var slideShow = (function () {
    'use strict';

    function displayImages() {
        $('#slide-show .hidden-slide').each(function () {
            var HiddenImageUrlSelector = $(this).find('.hidden-image-url');
            var HiddenImageUrl = HiddenImageUrlSelector.text().trim();
            HiddenImageUrlSelector.remove();
            $(this).find('img').attr('src', HiddenImageUrl);
            $(this).css('display', 'list-item');
        });
    }

    function startSlideShow() {
        $('.slide-description').each(function () {
            $(this).css('display', 'block');
        });

        $('#slide-show .hidden-slide').promise().done(function () {
            $('#slide-show .container').unslider({
                autoplay: true,
                infinite: true,
                arrows: false,
                speed: 1000,
                delay: 6000
            });
        });
    }

    function init() {
        displayImages();
        startSlideShow();
    }

    var slideShowModule = {
        init: init
    };

    return slideShowModule;

})();
