import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ContactComponent, pathMatch: 'full' }
    ]),
    PageHeaderModule,
    ReactiveFormsModule
  ]
})
export class ContactModule {}
