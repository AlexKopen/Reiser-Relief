var donate = (function () {
  'use strict';

  function donationFormInitialization() {
    $('#donation-form #frequency-list li').click(function () {
      $(this).parent().find('li').each(function() {
        $(this).removeClass('active');
      });
      $(this).addClass('active');

      $('#donation-form .donation-level').each(function() {
        $(this).removeClass('active');
      });

      $('#donation-form .donation-level li').each(function() {
        $(this).removeClass('active');
      });

      var activeDonationLevel;
      switch($(this).text()) {
        case 'One-Time':
          activeDonationLevel = $('#one-time-level');
          break;
        case 'Monthly':
          activeDonationLevel = $('#monthly-level');
          break;
        case 'Quarterly':
          activeDonationLevel = $('#quarterly-level');
          break;
        case 'Annually':
          activeDonationLevel = $('#annually-level');
          break;
        default:
          activeDonationLevel = $('#one-time-level');
          break;
      }

      activeDonationLevel.addClass('active');
    });

    var amountToDonate;
    $('#donation-form .donation-level li').click(function () {
      $('#donation-form .error').css('visibility', 'hidden');
      $('#donation-form .donation-level li').each(function() {
        $(this).removeClass('active');
      });

      $(this).addClass('active');
      amountToDonate = $(this).text().replace('$', '').trim();
    });

    $('#donation-form #custom-amount').keydown(function () {
      $('#donation-form .error').css('visibility', 'hidden');
    });

    $('#donation-form #custom-amount').keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });

    $('#donation-form #continue').click(function () {
      if ($('.donation-level.active li.active').length <= 0 && $('#custom-amount').val().trim().length <= 0) {
        $('#donation-form .error').css('visibility', 'visible');
      } else {
        var amountToChargeCard = $('#custom-amount').val().trim().length > 0 ? $('#custom-amount').val().trim() : amountToDonate;
        console.log (amountToChargeCard);
      }
    });
  }

  function init() {
    donationFormInitialization();
  }

  var donateModule = {
    init: init
  };

  return donateModule;

})();
