import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.scss']
})
export class LaporanComponent implements OnInit {
  errorMessage:any;
  isShowTable: boolean = true ;
  isShowDetalis: boolean = false ;
  isShowHeader: boolean = true ;
  isShowBack: boolean = false ;
  tittle: string = "Laporan";

  idlaporan: string;
  no_laporan: string;
  position_name: string;
  sub_kategori: string;
  status: string;
  tgl_submitted: string;
  tgl_approved: string;
  keterangan: string;
  user_id: string;

  workorders:any = [];
  allWorkorders:any = [];
  filterTerm: string;
  page = 1;
  pageSize = 8;
  collectionSize: number;
  currentRate = 8;

  constructor(private http: HttpClient, private global: GlobalService) { }

  ngOnInit() {       
    console.log(this.global.address+this.global.workorder, this.global.body, this.global.headers);
    this.http.post<any>(this.global.address+this.global.workorder, this.global.body, this.global.headers).subscribe({
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
  }

  showDetails (row:any){
    this.idlaporan = row.idlaporan;
    this.no_laporan = row.no_laporan;
    this.position_name = row.position_name;
    this.sub_kategori = row.sub_kategori;
    this.status = row.status;
    this.tgl_submitted = row.tgl_submitted;
    this.tgl_approved = row.tgl_approved;
    this.keterangan = row.keterangan;
    this.user_id = row.user_id;

    this.isShowTable = false;
    this.isShowDetalis = true;
    this.isShowHeader = false;
    this.isShowBack = true;
    }

  backToTable(){
    this.isShowTable = true;
    this.isShowDetalis = false;
    this.isShowHeader = true;
    this.isShowBack = false;
    this.tittle = "Laporan";
  }
  
  showHeader (){
      this.isShowTable = false;
      this.isShowDetalis = true;
  }
}