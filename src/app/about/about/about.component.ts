import { Component, OnInit } from '@angular/core';
import { NavigationSection } from '../../shared/models/navigation-section.model';
import { ABOUT_PAGE_SECTIONS } from '../../shared/constants/about-page-sections.constant';
import { AboutSections } from '../../shared/enums/about-sections.enum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutSections: NavigationSection[] = ABOUT_PAGE_SECTIONS;
  aboutSectionLabels = AboutSections;

  constructor() {}

  ngOnInit() {}

  onIntersection(event: any, navigationSection: NavigationSection) {
    navigationSection.active = event.visible;
  }

  findNavigationSection(title: string): NavigationSection {
    return this.aboutSections.find((aboutSection: NavigationSection) => {
      return aboutSection.title === title;
    });
  }

  navigationActive(navigationSection: NavigationSection): boolean {
    if (!navigationSection.active) {
      return false;
    } else {
      const nextNavigationSection = this.aboutSections[
        this.aboutSections.findIndex(
          (currentNavigationSection: NavigationSection) => {
            return currentNavigationSection === navigationSection;
          }
        ) + 1
      ];
      return (
        nextNavigationSection === undefined || !nextNavigationSection.active
      );
    }
  }
}
