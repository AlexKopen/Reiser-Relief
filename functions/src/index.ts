import { DonationFrequency } from '../../src/app/shared/enums/donation-frequency.enum';
import { Donation } from '../../src/app/shared/models/donation.model';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token);

exports.stripecharge = functions.firestore
  .document('stripe-payments/{wildcard}')
  .onCreate(async (snap: any, context: any) => {
    const donation: Donation = snap.data();

    stripe.customers.create(
      {
        source: donation.token.id,
        name: donation.name,
        email: donation.email,
        address: {
          line1: donation.address.line1,
          line2: donation.address.line2,
          country: 'USA',
          state: donation.address.state
        }
      },
      function(err: any, customer: any) {
        if (donation.frequency === DonationFrequency.OneTime) {
          stripe.charges.create({
            amount: donation.amount * 100,
            currency: 'usd',
            description: 'Reiser Relief Donation',
            customer: customer.id
          });
        } else {
          let subscriptionPlan;

          switch (donation.frequency) {
            case DonationFrequency.Monthly:
              subscriptionPlan = functions.config().stripe.subscription.monthly;
              break;
            case DonationFrequency.Quarterly:
              subscriptionPlan = functions.config().stripe.subscription
                .quarterly;
              break;
            case DonationFrequency.Annually:
              subscriptionPlan = functions.config().stripe.subscription
                .annually;
              break;
          }
          stripe.subscriptions.create({
            customer: customer.id,
            items: [
              {
                plan: subscriptionPlan,
                quantity: donation.amount
              }
            ]
          });
        }
      }
    );
  });
