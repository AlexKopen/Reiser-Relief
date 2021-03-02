import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalaComponent } from './gala/gala.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/modules/shared-modules/shared-components.module';

@NgModule({
  declarations: [GalaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GalaComponent, pathMatch: 'full' }
    ]),
    SharedComponentsModule
  ]
})
export class GalaModule {}
