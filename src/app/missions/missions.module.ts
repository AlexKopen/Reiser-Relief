import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './missions/missions.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../shared/modules/shared-modules/shared-components.module';
import { MissionTripsComponent } from './mission-trips/mission-trips.component';
import { MissionTripDetailsComponent } from './mission-trip-details/mission-trip-details.component';
import { FaqComponent } from './faq/faq.component';
import { ApplyComponent } from './apply/apply.component';
import { MissionsRoutingModule } from './missions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MissionsComponent,
    MissionTripsComponent,
    MissionTripDetailsComponent,
    FaqComponent,
    ApplyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MissionsComponent, pathMatch: 'full' }
    ]),
    SharedComponentsModule,
    MissionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MissionsModule {}
