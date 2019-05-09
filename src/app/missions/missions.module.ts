import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './missions/missions.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MissionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MissionsComponent, pathMatch: 'full' }
    ])
  ]
})
export class MissionsModule {}
