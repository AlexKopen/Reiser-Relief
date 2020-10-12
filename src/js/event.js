var event = (function () {
  'use strict';

  function eventShow() {
    // $('.individual-event .page-section-header').on('click', function () {
    //   $(this).parent().find('.event-content').slideToggle(800);
    //   $(this).parent().find('.right-arrow, .down-arrow').toggle();
    // });
  }

  function init() {
    eventShow();
  }

  var eventModule = {
    init: init
  };

  return eventModule;

})();
