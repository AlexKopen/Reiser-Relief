var application = (function () {
  'use strict';

  function allCheckboxSelected() {
    $('input[type=checkbox]').each(function () {
      $(this).prop('checked', false);
    });

    $('.pure-checkbox').change(function () {
      if ($('#apply input:checked').length === 2) {
        displayError(false);
      } else {
        $('#apply button').prop('disabled', true);
      }
    });
  }

  function submitApp() {
    $('#apply #submit-hold').click(function () {
      if ($('#apply input:checked').length !== 2) {
        displayError(true);
      }
    });
  }

  function displayError(error) {
    if (error) {
      $('#apply #error-message span').css('display', 'block');
      $('#apply .error-highlight').css('background', '#f5ab9e');
    } else {
      $('#apply button').prop('disabled', false);
      $('#apply #error-message span').css('display', 'none');
      $('#apply .error-highlight').css('background', 'none');
    }
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
