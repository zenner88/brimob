import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, CanActivate } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  token!: string;
  DashboardComponent: any;
  tokenStorageService: TokenStorageService;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().name;
      this.token = this.tokenStorage.getUser().token;

    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        return false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['dashboard']);
    // DashboardComponent;
  }
  logout() {
    // this.tokenStorageService.signOut();
    window.sessionStorage.clear();
    window.location.reload();
  }
}
