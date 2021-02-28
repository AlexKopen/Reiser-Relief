import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageHeaderComponent, PaymentComponent],
  imports: [
    CommonModule,
    NgxStripeModule.forRoot('pk_test_2AC3GUXKprvQgKxqOPQjxo2q'),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [PageHeaderComponent, PaymentComponent]
})
export class SharedComponentsModule {}
