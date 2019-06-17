import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmailSubscribe } from '../../shared/models/email-subscribe.model';

@Component({
  selector: 'app-newsletter-subscribe',
  templateUrl: './newsletter-subscribe.component.html',
  styleUrls: ['./newsletter-subscribe.component.scss']
})
export class NewsletterSubscribeComponent implements OnInit {
  subscribeForm: FormGroup;
  showSuccess = false;
  private formSubmitted = false;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.subscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  formSubmit(): void {
    this.formSubmitted = true;

    if (this.subscribeForm.valid) {
      this.showSuccess = true;
      this.db
        .collection<EmailSubscribe>('newsletter-subscriptions')
        .add({
          name: this.subscribeForm.value.name,
          email: this.subscribeForm.value.email,
          date: new Date()
        })
        .then(() => {});
    }
  }

  get errorMessage(): string {
    return this.formSubmitted && !this.subscribeForm.valid
      ? 'Please fill out both your name and a valid email address.'
      : '';
  }
}
