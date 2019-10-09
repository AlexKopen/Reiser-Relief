import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from '../../shared/services/missions.service';
import { MissionTrip } from '../../shared/models/mission-trip.model';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '../../shared/models/state.model';
import { STATES } from '../../shared/constants/states.constant';
import { Month } from '../../shared/models/month.model';
import { MONTHS } from '../../shared/constants/months.constant';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  applicationID: number;
  activeMissionTrip: MissionTrip;
  tripDataLoaded = false;
  submitted = false;
  states: State[] = STATES;
  months: Month[] = MONTHS;

  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    middleName: new FormControl(),
    lastName: new FormControl(),
    addressLine1: new FormControl(),
    addressLine2: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    zip: new FormControl(),
    homePhone: new FormControl(),
    cellPhone: new FormControl(),
    email: new FormControl(),
    dobMonth: new FormControl(),
    dobDay: new FormControl(),
    dobYear: new FormControl(),
    nationality: new FormControl(),
    birthPlace: new FormControl(),
    maidenName: new FormControl(),
    maritalStatus: new FormControl(),
    gender: new FormControl(),
    shirtSize: new FormControl(),
    passportNumber: new FormControl(),
    passportIssueDateMonth: new FormControl(),
    passportIssueDateDay: new FormControl(),
    passportIssueDateYear: new FormControl(),
    passportExpirationDateMonth: new FormControl(),
    passportExpirationDateDay: new FormControl(),
    passportExpirationDateYear: new FormControl(),
    questionWhy: new FormControl(),
    questionGifts: new FormControl(),
    questionExpectations: new FormControl(),
    questionConcerns: new FormControl(),
    questionHealth: new FormControl(),
    reference1Name: new FormControl(),
    reference1Relationship: new FormControl(),
    reference1Phone: new FormControl(),
    reference1Email: new FormControl(),
    reference2Name: new FormControl(),
    reference2Relationship: new FormControl(),
    reference2Phone: new FormControl(),
    reference2Email: new FormControl(),
    criminalHistory: new FormControl('', [Validators.required]),
    waiver: new FormControl('', [Validators.required])
  });

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

                    this.tripDataLoaded = true;
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

  get days(): string[] {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(`0${i}`.slice(-2));
    }

    return days;
  }

  get yearsBirth(): string[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i >= currentYear - 90; i--) {
      years.push(i);
    }

    return years;
  }

  get yearsIssue(): string[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(i);
    }

    return years;
  }

  get yearsExpiration(): string[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 10; i >= currentYear; i--) {
      years.push(i);
    }

    return years;
  }

  get showCriminalHistoryWarning(): boolean {
    return this.submitted && !this.applyForm.value.criminalHistory;
  }

  get showWaiverWarning(): boolean {
    return this.submitted && !this.applyForm.value.waiver;
  }

  get showErrorMessage(): boolean {
    return (
      this.submitted &&
      (this.showCriminalHistoryWarning || this.showWaiverWarning)
    );
  }

  get errorMessageText(): string {
    return `Please select the check box in ${
      this.showCriminalHistoryWarning ? "'Criminal History'" : ''
    }${
      this.showCriminalHistoryWarning && this.showWaiverWarning ? ' and' : ''
    }${
      this.showWaiverWarning
        ? " 'Agreement/Waiver and Release of Liability'"
        : ''
    }.`;
  }

  submitApplication(): void {
    this.submitted = true;

    if (!this.showErrorMessage) {
      console.table(this.applyForm.value);
    }
  }
}
