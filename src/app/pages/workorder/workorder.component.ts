import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.scss']
})
export class WorkorderComponent implements OnInit {
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

  constructor(private http: HttpClient, private global: GlobalService) { }

  ngOnInit() {       
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
    this.tittle = "List of Workorder";
  }
}