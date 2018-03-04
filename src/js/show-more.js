var showMore = (function () {
    'use strict';

    function showMoreToggle() {
        $('.more-toggle').click(function () {
            $(this).text() === 'Show more' ? $(this).text('Show less') : $(this).text('Show more');
            $(this).prev('.more-toggle-content').slideToggle();
        });
    }

    function init() {
        showMoreToggle();
    }

    var showMoreModule = {
        init: init
    };

    return showMoreModule;

})();
