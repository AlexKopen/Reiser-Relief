import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate/donate.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/modules/shared-modules/shared-components.module';
import { NumberPressDirective } from '../shared/directives/number-press.directive';

@NgModule({
  declarations: [DonateComponent, NumberPressDirective],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DonateComponent, pathMatch: 'full' }
    ]),
    SharedComponentsModule
  ]
})
export class DonateModule {}
