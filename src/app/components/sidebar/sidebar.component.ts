import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/portal/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/portal/facilitystats', title: 'Facility Stats',  icon: 'content_paste', class: '' },
    { path: '/portal/profiling', title: 'Profiling',  icon: 'person', class: '' },
    { path: '/typography', title: 'Upload',  icon: 'library_books', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
