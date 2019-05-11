import { Component, OnInit } from '@angular/core';
import { HomeCoreValue } from '../../shared/models/home-core-value.model';
import { CORE_VALUES } from '../../shared/constants/core-values.constant';

@Component({
  selector: 'app-core-values',
  templateUrl: './core-values.component.html',
  styleUrls: ['./core-values.component.scss']
})
export class CoreValuesComponent implements OnInit {
  coreValues: HomeCoreValue[] = CORE_VALUES;

  constructor() {}

  ngOnInit() {}
}
