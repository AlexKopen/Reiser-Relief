import { Component, OnInit } from '@angular/core';
import { CoreValue } from '../../shared/models/home-core-value.model';
import { CORE_VALUES } from '../../shared/constants/core-values.constant';

@Component({
  selector: 'app-home-values',
  templateUrl: './home-values.component.html',
  styleUrls: ['./home-values.component.scss']
})
export class HomeValuesComponent implements OnInit {
  coreValues: CoreValue[] = CORE_VALUES;

  constructor() {}

  ngOnInit() {}
}
