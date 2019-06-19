import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MissionTrip } from '../../shared/models/mission-trip.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/internal/operators';

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
    this.fetchTrips();
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
}
