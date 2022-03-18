import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isLoggedIn()) {
        return true;
      }
      Swal.fire('You don\'t have permission to view this page');
      Swal.fire({  
        icon: 'error',  
        title: 'Please Login!',  
        text: 'You don\'t have permission to view this page',  
      }).then(function() {
        window.location.reload();
      });
      return false;
  }
  
}
