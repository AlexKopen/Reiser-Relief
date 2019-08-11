import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate/donate.component';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DonateComponent, pathMatch: 'full' }
    ]),
    PageHeaderModule,
    NgxStripeModule.forRoot('pk_test_2AC3GUXKprvQgKxqOPQjxo2q'),
    FormsModule
  ]
})
export class DonateModule {}
