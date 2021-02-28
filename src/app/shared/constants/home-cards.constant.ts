import { HomeCard } from '../models/home-card.model';

export const HOME_CARDS = [
  new HomeCard(
    'Our Mission',
    'fas fa-globe',
    'We partner with impactful organizations to empower and engage the people of Haiti in Christ’s name.',
    '/about',
    'Learn More'
  ),
  new HomeCard(
    'Support Us',
    'fas fa-donate',
    'Your donation will provide incredibly clean water, food, education and care to the poor in Haiti.',
    '/donate',
    'Give Today'
  ),
  new HomeCard(
    'Mission Trips',
    'fas fa-suitcase-rolling',
    'Our mission trips make a real, tangible difference in the lives of those we serve.',
    '/missions',
    'Explore'
  )
];
