import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MissionTrip } from '../../shared/models/mission-trip.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map } from 'rxjs/internal/operators';
import { isPlatformBrowser } from '@angular/common';
import { MissionsService } from '../../shared/services/missions.service';

@Component({
  selector: 'app-mission-trips',
  templateUrl: './mission-trips.component.html',
  styleUrls: ['./mission-trips.component.scss']
})
export class MissionTripsComponent implements OnInit {
  missionTrips: MissionTrip[];
  dataFetched = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private missionsService: MissionsService
  ) {}

  ngOnInit() {
    this.missionsService.missionTrips$.subscribe(
      (missionTrips: MissionTrip[]) => {
        this.missionTrips = missionTrips;
      }
    );

    this.missionsService.missionsDataFetched$.subscribe(
      (dataFetched: boolean) => {
        this.dataFetched = dataFetched;
      }
    );
  }

  get tripsPopulated(): boolean {
    return this.missionTrips ? this.missionTrips.length > 0 : false;
  }

  routerLink(missionTrip: MissionTrip): string {
    return `/missions/apply/${missionTrip.id}`;
  }
}
