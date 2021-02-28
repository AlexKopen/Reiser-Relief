import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/modules/shared-modules/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ContactComponent, pathMatch: 'full' }
    ]),
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class ContactModule {}
