import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';
import Validation from '../../_utils/validation';

declare const google: any;

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private tokenStorage: TokenStorageService, private global: GlobalService) { }

  workorders:any = [];
  collectionSize: number;
  filterTerm: string;
  page = 1;
  pageSize = 8;
  
  ngOnInit(): void {  
    this.form = this.formBuilder.group(
      
      {
      username: [
        '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],
      password: [
        '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],  
      polda: ['',[Validators.required,]],        
      satwil: ['',[Validators.required,]],        
      level_user: ['',[Validators.required,]],        
      detail: 'add user',        
      
      }
    );
    let levelUser = this.tokenStorage.getUser().level_user;
    let polda = this.tokenStorage.getUser().polda;
    let satwil = this.tokenStorage.getUser().satwil;
    let token = this.tokenStorage.getUser().token;
    const body = {      
        "level_user" : levelUser,
        "polda" : polda,
        "satwil" : satwil,
        "start" : 1,
        "limit" : 1000
     };
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const headers = { headers: header };
        
    this.http.post<any>(this.global.address+this.global.workorder, body, headers).subscribe({
    next: data => {
      this.collectionSize = data.length;
      this.workorders = data;
      console.log(data);
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        if (error.status == 401 ){
          AuthInterceptor.signOut();
        }
    }
    })
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.http.post<any>(this.global.address+this.global.workorder, this.form.value).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          if (error.status == 401 ){
            AuthInterceptor.signOut();
          }
      }
      })
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}


