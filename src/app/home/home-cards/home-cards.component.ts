import { Component, OnInit } from '@angular/core';
import { HomeCard } from '../../shared/models/home-card.model';
import { HOME_CARDS } from '../../shared/constants/home-cards.constant';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {
  cards: HomeCard[] = HOME_CARDS;

  constructor() {}

  ngOnInit() {}
}
