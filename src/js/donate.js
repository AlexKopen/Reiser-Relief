var donate = (function () {
  'use strict';

  function stripeSetup() {
    // Create a Stripe client.
    var stripe = Stripe('pk_test_2AC3GUXKprvQgKxqOPQjxo2q');

// Create an instance of Elements.
    var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

// Create an instance of the card Element.
    var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

// Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

// Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      stripe.createToken(card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result.token);
          // Send the token to your server.
          stripeTokenHandler(result.token);
        }
      });
    });

// Submit the form with the token ID.
    function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);

      // Submit the form
      form.submit();
    }
  }

  function donationFormInitialization() {
    $('#donation-form #frequency-list li').click(function () {
      $(this).parent().find('li').each(function () {
        $(this).removeClass('active');
      });
      $(this).addClass('active');

      $('#donation-form .donation-level').each(function () {
        $(this).removeClass('active');
      });

      $('#donation-form .donation-level li').each(function () {
        $(this).removeClass('active');
      });

      var activeDonationLevel;
      switch ($(this).text()) {
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
      $('#donation-form .donation-level li').each(function () {
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
        console.log(amountToChargeCard);
      }
    });
  }

  function init() {
    donationFormInitialization();
    stripeSetup();
  }

  var donateModule = {
    init: init
  };

  return donateModule;

})();
