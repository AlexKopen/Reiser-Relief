var event = (function () {
  'use strict';

  function eventShow() {
    $('.individual-event').on('click', function () {
      $(this).find('.event-content').slideToggle(800);
      $(this).find('.right-arrow, .down-arrow').toggle();
    });
  }

  function init() {
    eventShow();
  }

  var eventModule = {
    init: init
  };

  return eventModule;

})();
