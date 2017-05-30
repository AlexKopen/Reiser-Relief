var faq = (function () {
    'use strict';

    function questionShow() {
        $('.question h3').on('click', function () {
            $(this).parent().find('p').slideToggle();
            $(this).parent().find('.right-arrow, .down-arrow').toggle();
        });
    }

    function init() {
        questionShow();
    }

    var faqModule = {
        init: init
    };

    return faqModule;

})();
