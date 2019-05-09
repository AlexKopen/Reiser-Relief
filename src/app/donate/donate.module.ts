import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DonateComponent} from './donate/donate.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DonateComponent, pathMatch: 'full' }
    ])
  ]
})
export class DonateModule { }
