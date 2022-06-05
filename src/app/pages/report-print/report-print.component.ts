import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router, CanActivate } from '@angular/router';
import { GlobalService } from '../../global.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-report-print',
  templateUrl: './report-print.component.html',
  styleUrls: ['./report-print.component.scss']
})
export class ReportPrintComponent implements OnInit {
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
  fieldTextType: boolean;
  tokenStorageService: TokenStorageService;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router, private global: GlobalService) { }

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
        this.errorMessage = err.statusText;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    let tokens = this.tokenStorage.getToken();
    let valid = this.tokenStorage.getUser().valid;
     if (tokens == undefined || valid == 2 ){
       Swal.fire({  
        icon: 'error',  
        title: 'Login Failed',  
        text: 'Your Username or Password invalid',  
        background: '#000000',
       }).then(function() {
         window.sessionStorage.clear();
         window.location.reload();
       });    }
     else {
       this.router.navigate(['dashboard']);
      //  window.location.reload();
     }
  }
  logout() {
    // this.tokenStorageService.signOut();
    window.sessionStorage.clear();
    window.location.reload();
  }
  // <!-- Switching method -->
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
