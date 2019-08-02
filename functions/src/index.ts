const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token);

exports.stripecharge = functions.firestore
  .document('stripe-payments/{wildcard}')
  .onCreate(async (snap: any, context: any) => {
    stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: snap.data().token.id
    });
  });
