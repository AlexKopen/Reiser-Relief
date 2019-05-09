import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from '../constants/menu-items.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems = MENU_ITEMS;
  showSideMenu = false;
  allowOutsideClick = false;

  constructor() {}

  ngOnInit() {}

  hamburgerClick(): void {
    this.showSideMenu = true;
  }

  closeClick(): void {
    this.showSideMenu = false;
    this.allowOutsideClick = false;
  }

  outsideMenuClick(): void {
    if (this.allowOutsideClick) {
      this.showSideMenu = false;
      this.allowOutsideClick = false;
    } else {
      this.allowOutsideClick = true;
    }
  }
}
