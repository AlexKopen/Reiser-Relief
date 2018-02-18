var menu = (function () {
  'use strict';

  function menuDrop() {
    $('#drop-down-menu').on('click', function () {
      $('header ul').slideToggle();
    });
  }

  function windowResize() {
    if (Modernizr.mq('(max-width: 767px)')) {
      $('header ul').css('display', 'none');
    }

    $(window).on('resize', function () {
      if (!Modernizr.mq('(max-width: 767px)')) {
        $('header ul').css('display', 'inline-block');
      } else {
        $('header ul').css('display', 'none');
      }
    });
  }

  function init() {
    menuDrop();
    windowResize();
  }

  var menuModule = {
    init: init
  };

  return menuModule;

})();
