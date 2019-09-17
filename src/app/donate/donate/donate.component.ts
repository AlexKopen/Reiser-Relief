import {Component, OnInit} from '@angular/core';
import {Element as StripeElement, Elements, StripeService} from 'ngx-stripe';
import {AngularFirestore} from '@angular/fire/firestore';
import {DonationLevel} from '../../shared/enums/donation-level.enum';
import {DONATION_FREQUENCIES} from '../../shared/constants/donation-frequencies.constant';
import {DonationFrequency} from '../../shared/enums/donation-frequency.enum';
import {Donation} from '../../shared/models/donation.model';
import {State} from '../../shared/models/state.model';
import {STATES} from '../../shared/constants/states.constant';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DonationAddress} from '../../shared/models/donation-address.model';
import {Router} from '@angular/router';
import {DONATION_LEVELS_ONE_TIME} from '../../shared/constants/donation-levels/donation-levels-one-time.constant';
import {DONATION_LEVELS_MONTHLY} from "../../shared/constants/donation-levels/donation-levels-monthly.constant";
import {DONATION_LEVELS_QUARTERLY} from "../../shared/constants/donation-levels/donation-levels-quarterly.constant";
import {DONATION_LEVELS_ANNUALLY} from "../../shared/constants/donation-levels/donation-levels-annually.constant";

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  elements: Elements;
  card: StripeElement;

  donationFrequencies = DONATION_FREQUENCIES;
  selectedDonationFrequency: DonationFrequency = DonationFrequency.Monthly;
  donorAddress: DonationAddress;
  selectedDonationLevel: DonationLevel;
  showOtherAmount = false;
  formInvalid = false;
  showThanks = false;

  customDonationAmount: number;

  states: State[] = STATES;

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
    private db: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.stripeService.elements().subscribe(elements => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#00514d',
              color: '#000',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#6e777f'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  get donationLevels(): any[] {
    let donationLevels: any[] = [];

    switch (this.selectedDonationFrequency) {
      case DonationFrequency.OneTime:
        donationLevels = donationLevels.concat(DONATION_LEVELS_ONE_TIME);
        break;
      case DonationFrequency.Monthly:
        donationLevels = donationLevels.concat(DONATION_LEVELS_MONTHLY);
        break;
      case DonationFrequency.Quarterly:
        donationLevels = donationLevels.concat(DONATION_LEVELS_QUARTERLY);
        break;
      case DonationFrequency.Annually:
        donationLevels = donationLevels.concat(DONATION_LEVELS_ANNUALLY);
        break;
    }

    donationLevels.push(DonationLevel.Other);

    return donationLevels;
  }

  donationLevelLabel(level: DonationLevel): string {
    return level === DonationLevel.Other ? level : `$${level}`;
  }

  donationLevelClick(level: DonationLevel) {
    this.selectedDonationLevel = level;
    this.showOtherAmount = level === DonationLevel.Other;
  }

  donationFrequencyClick(frequency: DonationFrequency) {
    this.showOtherAmount = false;
    this.selectedDonationLevel = null;
    this.selectedDonationFrequency = frequency;
  }

  frequencyActive(donationFrequency: DonationFrequency): boolean {
    return this.selectedDonationFrequency === donationFrequency;
  }

  levelActive(donationLevel: DonationLevel): boolean {
    return this.selectedDonationLevel === donationLevel;
  }

  get donationAmount(): number {
    return this.selectedDonationLevel === DonationLevel.Other
      ? this.customDonationAmount
      : (this.selectedDonationLevel as number);
  }

  submitPayment(): void {
    this.formInvalid = false;

    if (this.addressForm.valid) {
      this.donorAddress = new DonationAddress(
        this.addressForm.value.city,
        this.addressForm.value.state,
        this.addressForm.value.addressLine1,
        this.addressForm.value.addressLine2,
        this.addressForm.value.zip
      );

      this.stripeService.createToken(this.card, { name }).subscribe(result => {
        if (result.token) {
          this.showThanks = true;
          const donation: Donation = new Donation(
            this.selectedDonationFrequency,
            this.donationAmount,
            this.donorAddress,
            this.addressForm.value.name,
            this.addressForm.value.phone,
            this.addressForm.value.email,
            result.token
          );

          this.db
            .collection<Donation>('stripe-payments')
            .add(donation.toJson(donation))
            .then(() => {});
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
    } else {
      this.formInvalid = true;
    }
  }

  get errorMessage(): string {
    let errorMessage = '';
    if (this.formInvalid) {
      errorMessage += 'Please complete all payment information';

      if (
        this.selectedDonationLevel === undefined ||
        this.donationAmount === undefined ||
        this.donationAmount <= 0
      ) {
        errorMessage += ' and choose a donation level';
      }
    }

    return errorMessage;
  }

  home(): void {
    this.router.navigate(['/']);
  }
}
