import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from '../constants/menu-items.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems = MENU_ITEMS;

  initialHamburgerClickOccurred = false;
  showSideMenu = false;
  allowOutsideClickEvent = false;

  constructor() {}

  ngOnInit() {}

  hamburgerClick(): void {
    this.initialHamburgerClickOccurred = true;
    this.showSideMenu = true;
    // We set allowOutsideClickEvent in outsideMenuClick() because the click outside event is called immediately
  }

  closeClick(): void {
    this.showSideMenu = false;
    this.allowOutsideClickEvent = false;
  }

  outsideMenuClick(): void {
    if (this.allowOutsideClickEvent) {
      this.showSideMenu = false;
      this.allowOutsideClickEvent = false;
    } else {
      if (this.showSideMenu) {
        this.allowOutsideClickEvent = true;
      }
    }
  }

  get mobileMenuClass(): string {
    if (this.initialHamburgerClickOccurred) {
      return this.showSideMenu ? 'animated slideInLeft' : 'animated slideOutLeft';
    } else {
      return '';
    }
  }
}
