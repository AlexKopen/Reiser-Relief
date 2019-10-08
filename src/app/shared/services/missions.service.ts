import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MissionTrip } from '../models/mission-trip.model';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  missionTrips$ = new BehaviorSubject<MissionTrip[]>([]);
  missionsDataFetched$ = new BehaviorSubject<boolean>(false);

  constructor() {}
}
