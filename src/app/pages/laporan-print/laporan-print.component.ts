import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import Swal from 'sweetalert2'
declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
declare const google: any;

@Component({
  selector: 'app-laporan-print',
  templateUrl: './laporan-print.component.html',
  styleUrls: ['./laporan-print.component.scss']
})

export class LaporanPrintComponent implements OnInit {
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  html : SafeHtml;
  errorMessage:any;
  isShowTable: boolean = false ;
  isShowDetalis: boolean = true ;
  isShowHeader: boolean = false ;
  isShowBack: boolean = true ;
  tittle: string = "Laporan";

  idlaporan: string;
  no_laporan: string;
  nama: string;
  lat: string;
  long: string;
  laporan: string;
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
  htmlString: any;
  constructor(private http: HttpClient, private global: GlobalService, private sanitizer: DomSanitizer) { }

  ngOnInit() {       
    let body = {"no_laporan" : "2022/4/27/1"};
    this.http.post<any>(this.global.address+this.global.laporanPrint, body, this.global.headers).subscribe({
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

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }
}