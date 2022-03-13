import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-callcenter',
  templateUrl: './callcenter.component.html',
  styleUrls: ['./callcenter.component.scss']
})
export class CallcenterComponent implements OnInit {
  errorMessage:any;
  isShowTable: boolean = true ;
  isShowDetalis: boolean = false ;
  tittle: string = "List of Workorder";
  idworkorder: string;
  nama_pelapor: string;
  no_pengaduan: string;
  satwil_id: string;
  status: string;
  sub_kategori_id: string;
  tgl_close: string;
  tgl_kontak: string;
  workorders:any = [];
  allWorkorders:any = [];
  filterTerm: string;
  page = 1;
  pageSize = 8;
  collectionSize: number;
  currentRate = 8;
  
  // open: number;
  // opens:any = [];
  // received: number;
  // receiveds:any = [];
  // onprocess: number;
  // onprocesss:any = [];
  // close: number;
  // closes:any = [];
  // total: number;
  // totals:any = [];

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private global: GlobalService) { }

  ngOnInit() {
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

      // var open = data.filter(element => {
      //   return element.status == 1;
      // })
      // console.log("open"+open.length);

      // var received = data.filter(element => {
      //   return element.status == 2;
      // })
      // console.log("received"+received.length);

      // var onprocess = data.filter(element => {
      //   return element.status == 3;
      // })
      // console.log("onprocess"+onprocess.length);

      // var close = data.filter(element => {
      //   return element.status == 4;
      // })
      // console.log("close"+close.length);

      // var total = data.filter(element => {
      //   return element.status == 5;
      // })
      // console.log("total"+total.length);

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

  showDetails (row:any){
      this.idworkorder = row.idworkorder;
      this.nama_pelapor = row.nama_pelapor;
      this.no_pengaduan = row.no_pengaduan;
      this.satwil_id = row.satwil_id;
      this.status = row.status;
      this.sub_kategori_id = row.sub_kategori_id;
      this.tgl_close = row.tgl_close;
      this.tgl_kontak = row.tgl_kontak;

      this.isShowTable = false;
      this.isShowDetalis = true;
      this.tittle = "Details No Pengaduang " + this.no_pengaduan;
  }
  backToTable(){
    this.isShowTable = true;
    this.isShowDetalis = false;
    this.tittle = "Pengaduan";
  }
}