import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MissionsService } from './shared/services/missions.service';
import { MissionTrip } from './shared/models/mission-trip.model';
import { first, map } from 'rxjs/internal/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private missionsService: MissionsService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(value => {
        if (value instanceof NavigationStart) {
          window.scrollTo(0, 0);
        }
      });

      this.fetchTrips();
    }
  }

  private fetchTrips(): void {
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
      .snapshotChanges()
      .pipe(
        first(),
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as MissionTrip;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((missionTrips: MissionTrip[]) => {
        this.missionsService.missionTrips$.next(missionTrips);
        this.missionsService.missionsDataFetched$.next(true);
      });
  }
}
