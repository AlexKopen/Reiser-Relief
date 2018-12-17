var donate = (function () {
  'use strict';

  var amount;
  var frequency;

  function stripeSetup() {
    // Create a Stripe client.
    var stripe = Stripe('pk_live_MexJhaAUg9VRVL8d52RPoVDa');

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
    if ($('#card-element').length) {
      card.mount('#card-element');
    }

// Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    $('#donate-back').click(function () {
        $('#first-step').css('display', 'block');
        $('#second-step').css('display', 'none');
    });

    var loadingTimeout = null;
// Handle form submission.
   $('#donate-submit').click(function () {
     if (loadingTimeout !== null) {
         clearTimeout(loadingTimeout);
     }
     loadingTimeout = setTimeout(function () {
         $('#donation-loading').css('display', 'block');
     }, 300);
     $('#second-step').css('display', 'none');
     $('#payment-form').submit();
   });

      $('#payment-form').submit(function (event) {
          event.preventDefault();
          var cardholderName = $('#cardholder-name').text().trim();

          stripe.createToken(card, {name: cardholderName}).then(function (result) {
              if (result.error) {
                  if (loadingTimeout !== null) {
                      clearTimeout(loadingTimeout);
                  }
                  // Inform the user if there was an error.
                  $('#card-errors').text(result.error.message);
                  $('#donation-loading').css('display', 'none');
                  $('#second-step').css('display', 'block');
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
      var hiddenTokenInput = document.createElement('input');
      hiddenTokenInput.setAttribute('type', 'hidden');
      hiddenTokenInput.setAttribute('name', 'stripeToken');
      hiddenTokenInput.setAttribute('value', token.id);
      form.appendChild(hiddenTokenInput);

      var hiddenFrequencyInput = document.createElement('input');
      hiddenFrequencyInput.setAttribute('type', 'hidden');
      hiddenFrequencyInput.setAttribute('name', 'frequency');
      hiddenFrequencyInput.setAttribute('value', frequency);
      form.appendChild(hiddenFrequencyInput);

      var hiddenAmountInput = document.createElement('input');
      hiddenAmountInput.setAttribute('type', 'hidden');
      hiddenAmountInput.setAttribute('name', 'amount');
      hiddenAmountInput.setAttribute('value', amount);
      form.appendChild(hiddenAmountInput);

      var hiddenEmailInput = document.createElement('input');
      hiddenEmailInput.setAttribute('type', 'hidden');
      hiddenEmailInput.setAttribute('name', 'email');
      hiddenEmailInput.setAttribute('value', $('#cardholder-email').val().trim());
      form.appendChild(hiddenEmailInput);
      console.log(hiddenEmailInput);

      var hiddenNameInput = document.createElement('input');
      hiddenNameInput.setAttribute('type', 'hidden');
      hiddenNameInput.setAttribute('name', 'fullName');
      hiddenNameInput.setAttribute('value', $('#cardholder-name').val().trim());
      form.appendChild(hiddenNameInput);

        var hiddenAddress1Input = document.createElement('input');
        hiddenAddress1Input.setAttribute('type', 'hidden');
        hiddenAddress1Input.setAttribute('name', 'address1');
        hiddenAddress1Input.setAttribute('value', $('#cardholder-address-1').val().trim());
        form.appendChild(hiddenAddress1Input);

        var hiddenAddress2Input = document.createElement('input');
        hiddenAddress2Input.setAttribute('type', 'hidden');
        hiddenAddress2Input.setAttribute('name', 'address2');
        hiddenAddress2Input.setAttribute('value', $('#cardholder-address-2').val().trim());
        form.appendChild(hiddenAddress2Input);

        var hiddenCityInput = document.createElement('input');
        hiddenCityInput.setAttribute('type', 'hidden');
        hiddenCityInput.setAttribute('name', 'city');
        hiddenCityInput.setAttribute('value', $('#cardholder-city').val().trim());
        form.appendChild(hiddenCityInput);

        var hiddenStateInput = document.createElement('input');
        hiddenStateInput.setAttribute('type', 'hidden');
        hiddenStateInput.setAttribute('name', 'state');
        hiddenStateInput.setAttribute('value', $('#cardholder-state').val().trim());
        form.appendChild(hiddenStateInput);

        var hiddenZipInput = document.createElement('input');
        hiddenZipInput.setAttribute('type', 'hidden');
        hiddenZipInput.setAttribute('name', 'zip');
        hiddenZipInput.setAttribute('value', $('#cardholder-zip').val().trim());
        form.appendChild(hiddenZipInput);

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
      // Allow: backspace, delete, tab, escape, and enter
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
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

        amount = amountToChargeCard;
        frequency = $('#frequency-list .active').text();

        $('#first-step').css('display', 'none');
        $('#second-step').css('display', 'block');

        $('#donation-frequency-review').text('Donation Frequency: ' + frequency);
        $('#donation-amount-review').text('Donation Amount: $' + amount);
      }
    });
  }

  function paypalClick() {
    $('.paypal-link').click(function() {
      var url = 'https://www.paypal.com/cgi-bin/webscr';
      var inputField1Name = 'cmd';
      var inputField1Value = '_s-xclick';
      var inputField2Name = 'hosted_button_id';
      var inputField2Value = '3UD9NWCHCWPWE';

      var form = $(
        '<form action="' + url + '" method="post" target ="_blank" style="display:none">' +
        '<input name="' + inputField1Name + '" value="' + inputField1Value + '">' +
        '<input name="' + inputField2Name + '" value="' + inputField2Value + '">' +
        '</form>'
      );

      $('#donate').append(form);
      form.submit();
      form.remove();
    });
  }

  function init() {
    donationFormInitialization();
    stripeSetup();
    paypalClick();
  }

  var donateModule = {
    init: init
  };

  return donateModule;

})();
