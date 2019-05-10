import { HomeSlide } from '../models/home-slide.model';

export const HOME_SLIDES: HomeSlide[] = [
  new HomeSlide(
    'Our Impact',
    'We partner with impactful organizations to empower and engage the people of Haiti. Learn how we improve the lives of those we serve.',
    'impact-slide.jpg',
    'Our Impact',
    '/about',
    'Learn More'
  ),
  new HomeSlide(
    'Mission Trips',
    "Live out God's call to serve by applying for a mission trip to Haiti.",
    'missions-slide.jpg',
    'Mission Trips',
    '/missions',
    'Apply Today'
  ),
  new HomeSlide(
    'Support Us',
    'Your donation will provide clean water, food, education and care to the poor in Haiti. Help us break the cycle of poverty with a one-time or recurring gift.',
    'support-slide.jpg',
    'Support Us',
    '/donate',
    'Give Today'
  ),
  new HomeSlide(
    'Join Us',
    'We would love to learn more about you and your interest in our ministry.',
    'join-slide.jpg',
    'Join Us',
    '/contact',
    'Contact Us'
  )
];
