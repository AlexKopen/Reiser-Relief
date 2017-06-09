var application = (function () {
    'use strict';

    function allCheckboxSelected() {
        $('.pure-checkbox').change(function () {
            if ($('#apply input:checked').length === 2) {
                $('#apply button').prop('disabled', false);
                $('#apply #error-message span').css('display', 'none');
            } else {
                $('#apply button').prop('disabled', true);
            }
        });
    }

    function submitApp() {
        $('#apply #submit-hold').click(function () {
            if ($('#apply input:checked').length !== 2) {
                $('#apply #error-message span').css('display', 'block');
            }
        });
    }

    function init() {
        allCheckboxSelected();
        submitApp();
    }

    var applicationModule = {
        init: init
    };

    return applicationModule;

})();
