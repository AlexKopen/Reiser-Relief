import { Component, OnInit } from '@angular/core';
import { FAQS } from '../../shared/constants/faqs.constant';
import { FAQ } from '../../shared/models/faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: FAQ[] = FAQS;

  constructor() {}

  ngOnInit() {}
}
