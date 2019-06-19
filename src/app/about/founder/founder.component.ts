import { Component, OnInit } from '@angular/core';
import { FounderRow } from '../../shared/models/founder-row.model';
import { FOUNDER_ROWS } from '../../shared/constants/founder-rows.constant';

@Component({
  selector: 'app-founder',
  templateUrl: './founder.component.html',
  styleUrls: ['./founder.component.scss']
})
export class FounderComponent implements OnInit {
  founderRows: FounderRow[] = FOUNDER_ROWS;

  constructor() {}

  ngOnInit() {}
}
