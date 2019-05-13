import { HomeCard } from '../models/home-card.model';

export const HOME_CARDS = [
  new HomeCard(
    'Support Us',
    'fas fa-donate',
    'Your donation will provide clean water, food, education and care to the poor in Haiti.',
    '/donate',
    'Give Today'
  ),
  new HomeCard(
    'Mission Trips',
    'fas fa-suitcase',
    'Our mission trips make a real, tangible difference in the lives of those we serve.',
    '/missions',
    'Explore'
  ),
  new HomeCard(
    'Our Mission',
    'fas fa-hands-helping',
    'Learn how we improve the lives of those we serve.',
    '/about',
    'Learn More'
  )
];
