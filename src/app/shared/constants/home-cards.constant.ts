import { HomeCard } from '../models/home-card.model';

export const HOME_CARDS = [
  new HomeCard(
    'Support Us',
    'fas fa-donate',
    'Your donation will provide incredibly clean water, food, education and care to the poor in Haiti.',
    '/donate',
    'Give Today'
  ),
  new HomeCard(
    'Mission Trips',
    'fas fa-suitcase',
    'Our mission trips make a real, tangible difference in the lives of those we serve.',
    '/missions',
    'Explore'
  )
];
