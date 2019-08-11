import {Component, OnInit} from '@angular/core';
import {Element as StripeElement, Elements, StripeService} from 'ngx-stripe';
import {AngularFirestore} from '@angular/fire/firestore';
import {DonationLevel} from "../../shared/enums/donation-level.enum";
import {DONATION_LEVELS} from "../../shared/constants/donation-levels.constant";
import {DONATION_FREQUENCIES} from "../../shared/constants/donation-frequencies.constant";
import {DonationFrequency} from "../../shared/enums/donation-frequency.enum";

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  elements: Elements;
  card: StripeElement;

  donationFrequencies = DONATION_FREQUENCIES;
  selectedDonationFrequency: DonationFrequency;

  donationLevels = DONATION_LEVELS;
  selectedDonationLevel: number;
  showOtherAmount = false;

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

  donationLevelClick(level: DonationLevel) {
    if (level === DonationLevel.Other) {
      this.selectedDonationLevel = 0;
      this.showOtherAmount = true;
    } else {
      this.showOtherAmount = false;
      this.selectedDonationLevel = level;
    }
  }

  donationFrequencyClick(frequency: DonationFrequency) {
    this.selectedDonationFrequency = frequency;
  }

  buy() {
    this.stripeService.createToken(this.card, { name }).subscribe(result => {
      if (result.token) {
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
