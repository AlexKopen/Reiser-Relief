import {DonationFrequency} from '../../src/app/shared/enums/donation-frequency.enum';
import {Donation} from '../../src/app/shared/models/donation.model';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token);

exports.stripecharge = functions.firestore
  .document('stripe-payments/{wildcard}')
  .onCreate(async (snap: any, context: any) => {

      const donation: Donation = snap.data();

      if (donation.frequency === DonationFrequency.OneTime) {
          stripe.charges.create({
            amount: donation.amount * 100,
            currency: 'usd',
            description: 'Reiser Relief Donation',
            source: donation.token.id
          });
      } else {
          stripe.customers.create(
              {
                  source: snap.data().token.id,
                  name: 'Alex Kopen',
                  email: 'alexkopen@gmail.com',
                  address: {
                      line1: '8581 Shadow Creek Drive',
                      country: 'USA',
                      state: 'Minnesota'
                  }
              },
              function(err: any, customer: any) {
                  stripe.subscriptions.create({
                      customer: customer.id,
                      items: [
                          {
                              plan: functions.config().stripe.subscription.monthly,
                              quantity: 69
                          }
                      ]
                  });
              }
          );
      }
  });
