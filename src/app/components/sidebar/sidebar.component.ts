import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/chart', title: 'Chart',  icon: 'ni-chart-pie-35 text-success', class: '' },
    { path: '/workorder', title: 'Work Order',  icon:'ni-books text-orange', class: '' },
    { path: '/callCenter', title: 'Call Center',  icon:'ni-headphones text-primary', class: '' },
    { path: '/superadmin', title: 'Superadmin',  icon:'ni-single-02 text-danger', class: '' },
    { path: '/sms', title: 'SMS',  icon:'ni-email-83 text-info', class: '' },
    { path: '/report', title: 'Report',  icon:'ni-book-bookmark text-primary', class: '' },
    { path: '/ebook', title: 'E-Book',  icon:'ni-collection text-success', class: '' },
    { path: '/license', title: 'License',  icon:'ni-paper-diploma text-info', class: '' },
    { path: '/sendnotif', title: 'Send Notif',  icon:'ni-send text-orange', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
