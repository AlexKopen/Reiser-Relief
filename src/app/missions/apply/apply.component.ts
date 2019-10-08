import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from '../../shared/services/missions.service';
import { MissionTrip } from '../../shared/models/mission-trip.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit, OnDestroy {
  applicationID: number;
  activeMissionTrip: MissionTrip;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private missions: MissionsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.params.subscribe(parameters => {
        const applicationID = parameters['id'];
        if (applicationID === undefined) {
          this.navigateToMissions();
        } else {
          this.applicationID = applicationID;

          this.missions.missionsDataFetched$.subscribe(
            (dataFetched: boolean) => {
              if (dataFetched) {
                this.missions.missionTrips$.subscribe(
                  (missionTrips: MissionTrip[]) => {
                    this.activeMissionTrip = missionTrips.find(
                      (missionTrip: MissionTrip) => {
                        return missionTrip.id === this.applicationID;
                      }
                    );

                    // Navigate away if the trip doesn't exist or already happened
                    if (
                      this.activeMissionTrip === undefined ||
                      new Date(this.activeMissionTrip.date) < new Date()
                    ) {
                      this.navigateToMissions();
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  }

  private navigateToMissions(): void {
    this.router.navigate(['/missions']);
  }

  ngOnDestroy(): void {
    this.missions.missionsDataFetched$.unsubscribe();
    this.missions.missionTrips$.unsubscribe();
  }
}
