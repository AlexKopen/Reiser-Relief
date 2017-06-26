var give = (function () {
    'use strict';

    function tabClick() {
        $('.single-amount').on('click', function () {
            $('.selected-amount').removeClass('selected-amount');
            $(this).children('.donation-amount').addClass('selected-amount');
            $('.selected-amount-details').removeClass('selected-amount-details');
            var selectedAmountDetailsToDisplay;

            switch ($(this).children('.donation-amount').text()) {
                case '$10':
                    selectedAmountDetailsToDisplay = $('#ten-dollars');
                    break;
                case '$25':
                    selectedAmountDetailsToDisplay = $('#twenty-five-dollars');
                    break;
                case '$50':
                    selectedAmountDetailsToDisplay = $('#fifty-dollars');
                    break;
                default:
                    selectedAmountDetailsToDisplay = $('#other');
                    break;
            }

            selectedAmountDetailsToDisplay.addClass('selected-amount-details');
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
