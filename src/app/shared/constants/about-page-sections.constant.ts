import { NavigationSection } from '../models/navigation-section.model';
import { AboutSections } from '../enums/about-sections.enum';

export const ABOUT_PAGE_SECTIONS: NavigationSection[] = [
  new NavigationSection(AboutSections.coreValues, true),
  new NavigationSection(AboutSections.ourFounder, false),
  new NavigationSection(AboutSections.boardMembers, false)
];
