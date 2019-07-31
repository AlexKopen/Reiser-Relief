import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate/donate.component';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';

@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DonateComponent, pathMatch: 'full' }
    ]),
    PageHeaderModule
  ]
})
export class DonateModule {}
