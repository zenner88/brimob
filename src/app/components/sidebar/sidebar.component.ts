import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESADMIN: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/chart', title: 'Chart',  icon: 'ni-chart-pie-35 text-success', class: '' },
    { path: '/workorder', title: 'Work Order',  icon:'ni-books text-orange', class: '' },
    { path: '/callcenter', title: 'Call Center',  icon:'ni-headphones text-primary', class: '' },
    { path: '/user-add', title: 'Superadmin',  icon:'ni-single-02 text-danger', class: 'nav-item nav-with-child' },
    { path: '/sms', title: 'SMS',  icon:'ni-email-83 text-info', class: '' },
    { path: '/report', title: 'Report',  icon:'ni-book-bookmark text-primary', class: '' },
    { path: '/ebook', title: 'E-Book',  icon:'ni-collection text-success', class: '' },
    { path: '/license', title: 'License',  icon:'ni-paper-diploma text-info', class: '' },
    { path: '/sendnotif', title: 'Send Notif',  icon:'ni-send text-orange', class: '' },
];
export const ROUTESCC: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/callcenter', title: 'Call Center',  icon:'ni-headphones text-primary', class: '' },
  { path: '/report', title: 'Report',  icon:'ni-book-bookmark text-primary', class: '' },
  { path: '/ebook', title: 'E-Book',  icon:'ni-collection text-success', class: '' },
  { path: '/license', title: 'License',  icon:'ni-paper-diploma text-info', class: '' },
];
export const ROUTESUSER: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/workorder', title: 'Work Order',  icon:'ni-books text-orange', class: '' },
  { path: '/callcenter', title: 'Call Center',  icon:'ni-headphones text-primary', class: '' },
  { path: '/ebook', title: 'E-Book',  icon:'ni-collection text-success', class: '' },
  { path: '/license', title: 'License',  icon:'ni-paper-diploma text-info', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  tokenStorageService: any;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  token: string[] = [];
  position_name: string[] = [];
  department_name: string[] = [];
  region_name: string[] = [];
  level_user: string[] = [];
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    let levelUser = this.tokenStorage.getUser().level_user;
    if (levelUser == "superadmin"){
      this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
    }else if (levelUser == "callcenter"){
      this.menuItems = ROUTESCC.filter(menuItem => menuItem);
    }else if (levelUser == "user"){
      this.menuItems = ROUTESUSER.filter(menuItem => menuItem);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   if (this.tokenStorage.getToken()) {
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().name;
    this.token = this.tokenStorage.getUser().token;
    this.position_name = this.tokenStorage.getUser().position_name;
    this.region_name = this.tokenStorage.getUser().region_name;
    this.department_name = this.tokenStorage.getUser().department_name;
    this.level_user = this.tokenStorage.getUser().level_user;
    
  }
  //  sub menu 
  var NavWithChild = (function() {
  // Variables
  var $nav = $('.nav-item.nav-with-child');
  setTimeout(function(){
    $nav.each(function(index, each) {

        $(each).on('click',function(event) {
          if($(each).is('.nav-item-expanded')) {
            $(each).removeClass('nav-item-expanded')

          } else {
              $(each).addClass('nav-item-expanded')
          }
        })
      });
  },300)

  })();
  }
  logout(): void {
    // this.tokenStorageService.signOut();
    window.sessionStorage.clear();
    window.location.reload();
  }
}
