import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';
import { first } from 'rxjs/internal/operators';
import { SocialEvent } from '../../shared/models/social-event.model';
import { MissionTrip } from '../../shared/models/mission-trip.model';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-event-listings',
  templateUrl: './event-listings.component.html',
  styleUrls: ['./event-listings.component.scss']
})
export class EventListingsComponent implements OnInit {
  events: SocialEvent[];
  trips: SocialEvent[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchEvents();
      this.fetchTrips();
    }
  }

  fetchEvents(): void {
    const localEvents = JSON.parse(localStorage.getItem('events'));
    if (localEvents !== null) {
      this.events = localEvents;
    }

    const currentDate = new Date();
    const dateFormatted =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.db
      .collection<SocialEvent>('events', ref =>
        ref.where('date', '>=', dateFormatted)
      )
      .valueChanges()
      .pipe(first())
      .subscribe(events => {
        localStorage.setItem('events', JSON.stringify(events));
        this.events = events;
      });
  }

  fetchTrips(): void {
    const localTrips = JSON.parse(localStorage.getItem('mission-trips'));
    if (localTrips !== null) {
      this.trips = localTrips;
    }

    const currentDate = new Date();
    const dateFormatted =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.db
      .collection<MissionTrip>('mission-trips', ref =>
        ref.where('date', '>=', dateFormatted)
      )
      .valueChanges()
      .pipe(first())
      .subscribe(missionTrips => {
        const trips = [];
        missionTrips.forEach(trip => {
          trips.push(
            new SocialEvent(
              trip.date,
              'Port Au Prince, Haiti',
              'Mission Trip',
              '/missions'
            )
          );
        });
        localStorage.setItem('mission-trips', JSON.stringify(trips));
        this.trips = trips;
      });
  }

  get eventsAndTrips(): SocialEvent[] {
    if (!this.events || !this.trips) {
      return [];
    } else {
      return sortBy(this.events.concat(this.trips), 'date');
    }
  }
}
