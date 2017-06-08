var application = (function () {
    'use strict';

    function legalName() {
        var first, middle, last;

        $('#first, #middle, #last').on('input', function () {
            first = $('#first').val();
            middle = $('#middle').val();
            last = $('#last').val();

            $('#full-legal-name').text(first + ' ' + middle + ' ' + last);
        });
    }

    function allCheckboxSelected() {
        $('.pure-checkbox').change(function () {
            if($('input:checked').length === 2) {
                $('button').prop('disabled', false);
            } else {
                $('button').prop('disabled', true);
            }
        });
    }

    function init() {
        legalName();
        allCheckboxSelected();

    }

    var applicationModule = {
        init: init
    };

    return applicationModule;

})();
