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
      var $slider = $('#slide-show #slide-show-container').unslider({
        autoplay: true,
        infinite: true,
        arrows: false,
        speed: 1000,
        delay: 6000
      });

      if (Modernizr.mq('(max-width: 767px)')) {
        $slider.data('unslider').stop();
      }

      $(window).on('resize', function () {
        if (!Modernizr.mq('(max-width: 767px)')) {
          $slider.data('unslider').start();
        } else {
          $slider.data('unslider').stop();
        }
      });
    });
  }

  function init() {
    if ($('#home').length > 0) {
      displayImages();
      startSlideShow();
    }
  }

  var slideShowModule = {
    init: init
  };

  return slideShowModule;

})();
