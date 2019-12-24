import { Component, OnInit } from '@angular/core';
import { User } from 'Utilities/_models/Interface';

declare const $: any;


export const ROUTES: RouteInfo[] = [
  { path: '/portal/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '',  },
  { path: '/portal/facilitystats', title: 'Facility Stats',  icon: 'content_paste', class: '' },
  { path: '/portal/profiling', title: 'Profiling',  icon: 'person', class: '' },
  { path: '/portal/Upload', title: 'Upload',  icon: 'library_books', class: '' },
];


export const ROUTESStaff: RouteInfo[] = [
    { path: '/portal/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/portal/facilitystats', title: 'Facility Stats',  icon: 'content_paste', class: '' },
    { path: '/portal/profiling', title: 'Profiling',  icon: 'person', class: '' },
];

export const ROUTESPrincipal: RouteInfo[] = [
  { path: '/portal/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/portal/facilitystats', title: 'Facility Stats',  icon: 'content_paste', class: '' },
  { path: '/portal/Upload', title: 'Upload',  icon: 'library_books', class: '' },
];

export const ROUTESDist: RouteInfo[] = [
  { path: '/portal/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/portal/facilitystats', title: 'Facility Stats',  icon: 'content_paste', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  customerID = '';
  userDetails: User;

  constructor() {
    const user = localStorage.getItem('userInformation');
    if (user !== null) {
      this.customerID  = JSON.parse(user).userInfor.customerID;
    }
   }

  ngOnInit() {
    if (this.customerID === '100000') {
      this.menuItems = ROUTESStaff.filter(menuItem => menuItem);
    } else if (this.customerID === '' ) {
      this.menuItems = ROUTESDist;
    } else {
      this.menuItems = ROUTESPrincipal;
    }
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
