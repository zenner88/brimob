import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../_services/token-storage.service';

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
  term: string;
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    let levelUser = this.tokenStorage.getUser().level_user;
    let polda = this.tokenStorage.getUser().polda;
    let satwil = this.tokenStorage.getUser().satwil;
    const body = {      
        "level_user" : levelUser,
        "polda" : polda,
        "satwil" : satwil,
        "start" : 1,
        "limit" : 1000
     };
     
    this.http.post<any>('http://202.67.10.238:5000/datatable', body).subscribe({
        next: data => {
          this.workorders = data;
          this.allWorkorders = this.workorders;
          console.log(data);
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
  }
  search(value: string): void {
    this.workorders = this.allWorkorders.filter((val) => val.name.toLowerCase().includes(value));
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