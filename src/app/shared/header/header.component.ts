import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../constants/menu-items.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: string[] = MENU_ITEMS;
  mobileMenuActionClicked = false;

  constructor() {}

  ngOnInit() {}

  menuItemAsRoute(menuItem: string): string {
    if (menuItem.toLowerCase() === 'home') {
      return '/';
    }
    return '/' + menuItem.replace(' ', '-').toLowerCase();
  }

  mobileMenuActionClick(): void {
    this.mobileMenuActionClicked = !this.mobileMenuActionClicked;
  }

  hideMenu(): void {
    this.mobileMenuActionClicked = false;
  }

  get mobileIconClass(): string {
    return this.mobileMenuActionClicked ? 'fas fa-times' : 'fas fa-bars';
  }
}
