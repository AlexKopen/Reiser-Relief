const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token);

exports.stripecharge = functions.firestore
  .document('stripe-payments/{wildcard}')
  .onCreate(async (snap: any, context: any) => {
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
              plan: 'sapphire-extended-385'
            }
          ]
        });
      }
    );

    // stripe.charges.create({
    //   amount: 999,
    //   currency: 'usd',
    //   description: 'Example charge',
    //   source: snap.data().token.id
    // });
  });
