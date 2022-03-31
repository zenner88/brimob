import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})

export class UserAddComponent implements OnInit {
  form: FormGroup;
  formEdit: FormGroup;
  submitted = false;
  submittedz = false;
  errorMessage: any;
  username: any;
  username2: any;
  position: any;
  fieldTextType: boolean;
  fieldTextType2: boolean;
  fieldTextType3: boolean;
  showAdd: boolean = true ;
  showEdit: boolean = false ;

  constructor(private formBuilder: FormBuilder, private formBuilder2: FormBuilder, private http: HttpClient, private tokenStorage: TokenStorageService, private global: GlobalService) { }

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
      position_id: ['',[Validators.required,]],        
      level_user: ['user',[Validators.required,]],        
      detail: 'add user from application',        
      
      }
    );
    this.formEdit = this.formBuilder2.group(
      
      {
      username: [
        this.username2,
        ],
      password: [
        '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],  
      ol_password: [
        '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],  
     
      }
    );
    this.http.post<any>(this.global.address+this.global.listUser, this.global.body, this.global.headers).subscribe({
    next: data => {
      this.collectionSize = data.length;
      this.workorders = data;
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        if (error.status == 401 ){
          AuthInterceptor.signOut();
        }
    }
    })
    // Get Subkategori 
    this.http.get<any>(this.global.address+this.global.position).subscribe({
    next: data => {
      this.position = data;
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
  get g(): { [key: string]: AbstractControl } {
    return this.formEdit.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.http.post<any>(this.global.address+this.global.simpanUser, this.form.value).subscribe({
      next: data => {
        let valid = data.valid;
        if (valid == 1){
          Swal.fire({  
            icon: 'success',  
            title: 'Sukses',  
            text: 'User berhasil ditambahkan!',  
            background: '#000000',
          })
          this.onReset();
        }
        else if (valid == 2){
          Swal.fire({  
            icon: 'error',  
            title: 'Error',  
            text: 'Username sudah ada coba username lain!',  
            background: '#000000',
          })
        }
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

  editPasswrord(row:any){
    
    let iduser = row.iduser;
    this.username2 = row.username;
    let level_user = row.level_user;
    console.log(iduser, this.username2, level_user);
    console.log(iduser, this.username2, level_user);
    this.showAdd = false;
    this.showEdit = true;
  }

  onSubmitEdit(): void {
    this.submittedz = true;
    if (this.formEdit.value.invalid) {
      return;
      console.log("INVALID!!!");
    }
    this.http.post<any>(this.global.address+this.global.editPassword, this.formEdit.value, this.global.headers).subscribe({
      next: data => {
        let valid = data.valid;
        if (valid == 1){
          Swal.fire({  
            icon: 'success',  
            title: 'Sukses',  
            text: 'Password berhasil diganti!',  
            background: '#000000',
          })
          this.onResetEdit();
          this.closeEdit();
        }
        else if (valid == 0){
          Swal.fire({  
            icon: 'error',  
            title: 'Error',  
            text: 'Password lama salah!',  
            background: '#000000',
          })
        }
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          if (error.status == 401 ){
            AuthInterceptor.signOut();
          }
      }
      })
    console.log(JSON.stringify(this.formEdit.value, null, 2));
}
  
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  onResetEdit(): void {
    this.submittedz = false;
    this.formEdit.reset();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  toggleFieldTextType3() {
    this.fieldTextType3 = !this.fieldTextType3;
  }
  
  closeEdit(){
    this.showAdd = true;
    this.showEdit = false;
  }
}


