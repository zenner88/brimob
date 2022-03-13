import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, Subscription, of  } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'

// const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static signOut() {
    window.sessionStorage.clear();
    window.location.reload();
    Swal.fire({  
      icon: 'error',  
      title: 'Please Login!',  
      text: 'Token expired please login again.',  
    })  
    // this.router.navigate(["login"]);
  }
  static tokenSubscription: any;
  static router: any;
  constructor(private router: Router, private token: TokenStorageService) { }
  tokenSubscription = new Subscription()

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];