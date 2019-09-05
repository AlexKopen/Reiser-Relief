'use strict';
exports.__esModule = true;
var Donation = /** @class */ (function() {
  function Donation(frequency, amount, address, name, phone, email, token) {
    this.frequency = frequency;
    this.amount = amount;
    this.address = address;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.token = token;
  }
  Donation.prototype.toJson = function(donation) {
    return JSON.parse(JSON.stringify(donation));
  };
  return Donation;
})();
exports.Donation = Donation;
