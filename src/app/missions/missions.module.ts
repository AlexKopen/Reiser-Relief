import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './missions/missions.component';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';

@NgModule({
  declarations: [MissionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MissionsComponent, pathMatch: 'full' }
    ]),
    PageHeaderModule
  ]
})
export class MissionsModule {}
