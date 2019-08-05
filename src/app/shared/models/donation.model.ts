import { DonationFrequency } from '../enums/donation-frequency.enum';
import { DonationLevel } from '../enums/donation-level.enum';
import { DonationAddress } from './donation-address.model';

export class Donation {
  frequency: DonationFrequency;
  level: DonationLevel;
  address: DonationAddress;
  name: string;
  phone: string;
  email: string;
}
