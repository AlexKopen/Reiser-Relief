import { Component, OnInit } from '@angular/core';
import { HomeSlide } from '../../shared/models/home-slide.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  homeSlide = new HomeSlide(
    'Support Us',
    'Your donation will provide clean water, food, education and care to the poor in Haiti. Help us break the cycle of poverty with a one-time or recurring gift.',
    'support-slide.jpg',
    'Support Us',
    '/donate',
    'Give Today'
  );

  constructor() {}

  ngOnInit() {}
}
