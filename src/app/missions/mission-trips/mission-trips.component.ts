import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MissionTrip } from '../../shared/models/mission-trip.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/internal/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mission-trips',
  templateUrl: './mission-trips.component.html',
  styleUrls: ['./mission-trips.component.scss']
})
export class MissionTripsComponent implements OnInit {
  missionTrips: MissionTrip[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchTrips();
    }
  }

  fetchTrips(): void {
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
        this.missionTrips = missionTrips;
      });
  }

  get tripsPopulated(): boolean {
    return this.missionTrips ? this.missionTrips.length > 0 : false;
  }

  applicationText(missionTrip: MissionTrip) {
    return missionTrip.full ? 'Trip is full' : '<a href="">Apply today<a>';
  }
}