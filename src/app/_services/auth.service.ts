import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://202.67.10.238:5000/login_user';
const TOKEN_KEY = 'auth-token';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  redirectUrl: string;
  public  statusLogin : boolean;

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
  isLoggedIn(): boolean {
    let tokens = window.sessionStorage.getItem(TOKEN_KEY);
    if (tokens == undefined){
      return false;
    }
    else{
      return true;
    }
  }
}
