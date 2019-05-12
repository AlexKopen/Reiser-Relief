import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter-subscribe',
  templateUrl: './newsletter-subscribe.component.html',
  styleUrls: ['./newsletter-subscribe.component.scss']
})
export class NewsletterSubscribeComponent implements OnInit {
  subscribeForm: FormGroup;
  private formSubmitted = false;

  constructor() {}

  ngOnInit() {
    this.subscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  formSubmit(): void {
    this.formSubmitted = true;
  }

  get errorMessage(): string {
    return this.formSubmitted && !this.subscribeForm.valid
      ? 'Please fill out both your name and a valid email address.'
      : '';
  }
}
