import { DonationFrequency } from '../enums/donation-frequency.enum';
import { DonationAddress } from './donation-address.model';

export class Donation {
  frequency: DonationFrequency;
  amount: number;
  address: DonationAddress;
  name: string;
  email: string;
  token: any;

  constructor(
    frequency: DonationFrequency,
    amount: number,
    address: DonationAddress,
    name: string,
    email: string,
    token: any
  ) {
    this.frequency = frequency;
    this.amount = amount;
    this.address = address;
    this.name = name;
    this.email = email;
    this.token = token;
  }
}
