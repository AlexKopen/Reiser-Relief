var donate = (function () {
  'use strict';

  function buttonClick() {
    $('.donation-container').click(function () {
      var amountClicked = $(this).children('.donation-amount').text().trim();
      var url = 'https://www.paypal.com/cgi-bin/webscr';
      var inputField1Name = 'cmd';
      var inputField1Value = '_s-xclick';
      var inputField2Name = 'hosted_button_id';
      var inputField2Value;

      switch (amountClicked) {
        case '$25':
          inputField2Value = 'FYVU8GZE52KJA';
          break;
        case '$50':
          inputField2Value = 'Z8Y7MHEWPSQNA';
          break;
        case '$100':
          inputField2Value = 'Y583V7BZ3WWU4';
          break;
        default:
          inputField2Value = '3UD9NWCHCWPWE';
          break;
      }

      var form = $(
        '<form action="' + url + '" method="post" target ="_blank" style="display:none">' +
        '<input name="' + inputField1Name + '" value="' + inputField1Value + '">' +
        '<input name="' + inputField2Name + '" value="' + inputField2Value + '">' +
        '</form>'
      );

      $('#give').append(form);
      form.submit();
    });
  }

  function init() {
    buttonClick();
  }

  var donateModule = {
    init: init
  };

  return donateModule;

})();
