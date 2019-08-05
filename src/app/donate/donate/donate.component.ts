import { Component, OnInit } from '@angular/core';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions
} from 'ngx-stripe';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContactForm } from '../../shared/models/contact-form.model';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  elements: Elements;
  card: StripeElement;

  constructor(
    private stripeService: StripeService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.stripeService.elements().subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  buy() {
    this.stripeService.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        console.log(result.token);

        this.db
          .collection<any>('stripe-payments')
          .add({
            token: result.token
          })
          .then(() => {});
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
      }
    });
  }
}
