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

    $('#donation-form .donation-level li').click(function () {
      $('#donation-form .error').css('visibility', 'hidden');
      $('#donation-form .donation-level li').each(function() {
        $(this).removeClass('active');
      });

      $(this).addClass('active');
    });

    $('#donation-form #custom-amount').keypress(function () {
      console.log('changed');
      $('#donation-form .error').css('visibility', 'hidden');
    });

    $('#donation-form #continue').click(function () {
      console.log($('#custom-amount').val());
      if ($('.donation-level.active li.active').length <= 0 && $('#custom-amount').val().length <= 0) {
        $('#donation-form .error').css('visibility', 'visible');
      } else {
        // send donate value over
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
