import { Component, OnInit } from '@angular/core';
import { HOME_SLIDES } from '../../shared/constants/home-slides.const';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  homeSlides = HOME_SLIDES;

  constructor() {}

  ngOnInit() {}
}
