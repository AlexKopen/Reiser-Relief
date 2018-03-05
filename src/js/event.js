var event = (function () {
  'use strict';

  function eventShow() {
    $('.individual-event h2').on('click', function () {
      $(this).next('.event-content').slideToggle();
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
