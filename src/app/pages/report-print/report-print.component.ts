import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { ActivatedRoute } from '@angular/router';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-print',
  templateUrl: './report-print.component.html',
  styleUrls: ['./report-print.component.scss']
})
export class ReportPrintComponent implements OnInit {
  noLaporan: any;
  tglLaporan: any;
  published: any;
  errorMessage: any;
  region: any;
  subKategori: any;

  constructor(private http: HttpClient, public router: Router, private global: GlobalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // http://localhost:4200/#/report?n=1234567
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.noLaporan = params.n;
        console.log(this.noLaporan);
      }
    );
    let no = this.noLaporan;
    let body = {
      "no_laporan" : no
      };
    let region = no.slice(-1);
    console.log("no laporan :",no);
    console.log("region :",region);
    this.http.post<any>(this.global.address+this.global.laporanReview, body).subscribe({
      next: data => {
        // console.log(data);
        this.published = data;
        console.log("published : ",this.published)
        this.tglLaporan = data[0].tgl_laporan;
        this.subKategori = data[0].sub_kategori;
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          if (error.status == 401 ){
            AuthInterceptor.signOut();
          }
      }
      })
  
    this.http.get<any>(this.global.address+this.global.region).subscribe({
      next: data => {
        this.region = data.filter(x => x.id == region);
        console.log("region get :",this.region);
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
}
