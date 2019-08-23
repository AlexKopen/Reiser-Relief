import { Component, OnInit } from '@angular/core';
import { Element as StripeElement, Elements, StripeService } from 'ngx-stripe';
import { AngularFirestore } from '@angular/fire/firestore';
import { DonationLevel } from '../../shared/enums/donation-level.enum';
import { DONATION_LEVELS } from '../../shared/constants/donation-levels.constant';
import { DONATION_FREQUENCIES } from '../../shared/constants/donation-frequencies.constant';
import { DonationFrequency } from '../../shared/enums/donation-frequency.enum';
import { Donation } from '../../shared/models/donation.model';
import { State } from '../../shared/models/state.model';
import { STATE } from '../../shared/constants/states.constant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonationAddress } from '../../shared/models/donation-address.model';

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
  donorAddress: DonationAddress;

  donationLevels = DONATION_LEVELS;
  selectedDonationLevel: number;
  showOtherAmount = false;

  states: State[] = STATE;

  addressForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

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
    this.donorAddress = new DonationAddress(
      this.addressForm.value.city,
      this.addressForm.value.state,
      this.addressForm.value.addressLine1,
      this.addressForm.value.addressLine2,
      this.addressForm.value.zip
    );

    const donation: Donation = new Donation(
      this.selectedDonationFrequency,
      this.selectedDonationLevel,
      this.donorAddress,
      this.addressForm.value.name,
      this.addressForm.value.phone,
      this.addressForm.value.email
    );

    this.stripeService.createToken(this.card, {name}).subscribe(result => {
        if (result.token) {
            console.log(result.token);

            this.db
                .collection<Donation>('stripe-payments')
                .add(donation.toJson(donation))
                .then(() => {
                });
        } else if (result.error) {
            console.log(result.error.message);
        }
    });
  }
}
