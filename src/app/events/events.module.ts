import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { RouterModule } from '@angular/router';
import {PageHeaderModule} from '../shared/modules/page-header/page-header.module';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EventsComponent, pathMatch: 'full' }
    ]),
      PageHeaderModule
  ]
})
export class EventsModule {}
