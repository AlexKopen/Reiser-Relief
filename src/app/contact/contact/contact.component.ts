import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ContactForm } from '../../shared/models/contact-form.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl('')
    });
  }

  formSubmit(): void {
    this.submitted = true;
    this.db
      .collection<ContactForm>('contact-form-submissions')
      .add({
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message
      })
      .then(() => {});
  }
}
