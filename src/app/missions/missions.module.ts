import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './missions/missions.component';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { MissionTripsComponent } from './mission-trips/mission-trips.component';
import { MissionTripDetailsComponent } from './mission-trip-details/mission-trip-details.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [
    MissionsComponent,
    MissionTripsComponent,
    MissionTripDetailsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MissionsComponent, pathMatch: 'full' }
    ]),
    PageHeaderModule
  ]
})
export class MissionsModule {}
