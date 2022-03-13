import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTESADMIN, ROUTESCC, ROUTESUSER } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  tokenStorageService: any;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  token: string[] = [];
  polda: string[] = [];
  satwil: string[] = [];
  level_user: string[] = [];
  // tokenStorageService: TokenStorageService;

  constructor(location: Location,  private element: ElementRef, private router: Router, private tokenStorage: TokenStorageService) {
    this.location = location;
  }

  ngOnInit() {
    let levelUser = this.tokenStorage.getUser().level_user;
    if (levelUser == "superadmin"){
      this.listTitles = ROUTESADMIN.filter(listTitle => listTitle);
    }else if (levelUser == "callcenter"){
      this.listTitles = ROUTESCC.filter(listTitle => listTitle);
    }else if (levelUser == "user"){
      this.listTitles = ROUTESUSER.filter(listTitle => listTitle);
    }
    // this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().name;
      this.token = this.tokenStorage.getUser().token;
      this.polda = this.tokenStorage.getUser().polda;
      this.satwil = this.tokenStorage.getUser().satwil;
      this.level_user = this.tokenStorage.getUser().level_user;
      
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  logout(): void {
    // this.tokenStorageService.signOut();
    window.sessionStorage.clear();
    window.location.reload();
  }
}
