export class DonationAddress {
  city: string;
  state: string;
  line1: string;
  line2: string;
  zip: string;

  constructor(city: string, state: string, line1: string, line2: string, zip: string) {
    this.city = city;
    this.state = state;
    this.line1 = line1;
    this.line2 = line2;
    this.zip = zip;
  }
}
