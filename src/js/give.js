var give = (function () {
    'use strict';

    function tabClick() {
        $('.single-amount').on('click', function () {
            $('.selected-amount').removeClass('selected-amount');
            $(this).children('.donation-amount').addClass('selected-amount');
            $('.selected-amount-details').removeClass('selected-amount-details');

            switch ($(this).children('.donation-amount').text()) {
                case '$10':
                    $('#ten-dollars').addClass('selected-amount-details');
                    break;
                case '$25':
                    $('#twenty-five-dollars').addClass('selected-amount-details');
                    break;
                case '$50':
                    $('#fifty-dollars').addClass('selected-amount-details');
                    break;
                default:
                    $('#other').addClass('selected-amount-details');
                    break;
            }
        });
    }

    function init() {
        tabClick();
    }

    var giveModule = {
        init: init
    };

    return giveModule;

})();
