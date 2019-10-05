import { Component, OnInit } from '@angular/core';
import { NavigationSection } from '../../shared/models/navigation-section.model';
import { ABOUT_PAGE_SECTIONS } from '../../shared/constants/about-page-sections.constant';
import { AboutSections } from '../../shared/enums/about-sections.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutSections: NavigationSection[] = ABOUT_PAGE_SECTIONS;
  aboutSectionLabels = AboutSections;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const routerUrl = this.router.url;

    if (routerUrl === '/about') {
      this.router.navigate(['/about/core-values']);
    } else {
      this.activatedRoute.params.subscribe(params => {
        let sectionToActivate: NavigationSection;
        switch (params['sub-page']) {
          case 'core-values':
            sectionToActivate = this.findNavigationSection(
                this.aboutSectionLabels.coreValues
            );
            break;
          case 'board-members':
            sectionToActivate = this.findNavigationSection(
                this.aboutSectionLabels.boardMembers
            );
            break;
          case 'our-founder':
            sectionToActivate = this.findNavigationSection(
                this.aboutSectionLabels.ourFounder
            );
            break;
          default:
            sectionToActivate = this.findNavigationSection(
                this.aboutSectionLabels.coreValues
            );
            break;
        }

        this.aboutSections.map((aboutSection: NavigationSection) => {
          aboutSection.active = false;
          return aboutSection;
        });

        sectionToActivate.active = true;
      });
    }
  }

  sectionActive(aboutSectionLabel: string): boolean {
    return this.findNavigationSection(aboutSectionLabel).active;
  }

  activateSection(navigationSection: NavigationSection): void {
    const route = navigationSection.title
      .split(' ')
      .join('-')
      .toLowerCase();
    this.router.navigate([`/about/${route}`]);
  }

  private findNavigationSection(title: string): NavigationSection {
    return this.aboutSections.find((aboutSection: NavigationSection) => {
      return aboutSection.title === title;
    });
  }
}
