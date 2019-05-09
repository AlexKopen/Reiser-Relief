import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EventsComponent, pathMatch: 'full' }
    ])
  ]
})
export class EventsModule {}
