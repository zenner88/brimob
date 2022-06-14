import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import Swal from 'sweetalert2'
declare var require: any;
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
declare const google: any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-laporan-big',
  templateUrl: './laporan-big.component.html',
  styleUrls: ['./laporan-big.component.scss'],
  providers: [DatePipe]
})

export class LaporanBigComponent implements OnInit {
  laporanForm : FormGroup;
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
  published: any;
  region: any;
  tglLaporan: any;
  subKategori: any;
  positions: any;
  department: any[];
  posi: any[];
  position: any[];
  kategori: any;
  submitted = false;
  constructor(private http: HttpClient, private global: GlobalService, private sanitizer: DomSanitizer, private modalService: NgbModal, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  get f(): { [key: string]: AbstractControl } {
    return this.laporanForm.controls;
  }

  ngOnInit(): void { 
    this.laporanForm = this.formBuilder.group(
      {
      region_id: ['',[Validators.required,]],
      department_id: ['',[Validators.required,]],
      sub_kategori_id: ['',[Validators.required,]],
      tgl_laporan: ['',[Validators.required,]],
      })  

    this.http.get<any>(this.global.address+this.global.laporanPublished).subscribe({
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

    // Get region && department 
    this.http.get<any>(this.global.address+this.global.position).subscribe({
      next: data => {
        this.positions = data;
        // this.position = data;
        // data.filter(data => data.region_id === 1);
        // console.log("filter", this.position);
        this.position = this.removeDuplicates(data, "region_id");
        console.log("uniqueArray is: " + JSON.stringify(this.position));
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
    // Get Kategori 
    this.http.get<any>(this.global.address+this.global.getSubkategori).subscribe({
      next: data => {
        this.kategori = data;
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
    console.log(row);
    this.idlaporan = row.id;
    this.no_laporan = row.no_laporan;
    this.nama = row.nama;
    this.position_name = row.position_name;
    this.sub_kategori = row.sub_kategori;
    this.status = row.status;
    this.tgl_submitted = row.tgl_submitted;
    this.tgl_approved = row.tgl_approved;
    this.keterangan = row.keterangan;
    this.user_id = row.user_id;
    this.lat = row.lat_pelapor;
    this.long = row.long_pelapor;
    this.laporan = row.laporan_text;

    this.isShowTable = true;
    this.isShowDetalis = false;
    this.isShowHeader = true;
    this.isShowBack = false;
    
    // maps 
    let map = document.getElementById('map-canvas');
    // let lat = map.getAttribute('data-lat');
    // let lng = map.getAttribute('data-lng');
    console.log(map);

    let lat = this.lat;
    let lng = this.long;
    let markers = [
      { lat: this.lat, lng: this.long, city: "bandung", type: 1 },
    ];
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
          {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
          // {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
          {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
          // {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
          // {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
    }
    map = new google.maps.Map(map, mapOptions);
    markers.forEach(location => {
      // custom logo for marker 
      let markerLogo: string;
      if (location.type == 1){ 
        markerLogo='accident-logo.png';
      }else if(location.type == 2){
        markerLogo='traffic-logo.png';
      }
      // marker 
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
        options: {
          animation: google.maps.Animation.DROP,
          icon: "./assets/img/icons/"+markerLogo
        }
      });
      // info window marker 
      var contentString = '<div class="info-window-content"><h2>'+location.city+'</h2>' +
      '<p>Ini '+location.city+' bro!</p></div>';
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });
      google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){ 
        return function() {
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
        };
    })
    (marker,contentString,infowindow))

  });
  // end maps 
    }
review(index:any, content){
  console.log(index)
  let no = index.no_laporan;
  let body = {
    "no_laporan" : no
    };
  let region = no.slice(-1);
  console.log("no laporan :",no);
  console.log("region :",region);
  this.http.post<any>(this.global.address+this.global.laporanReview, body).subscribe({
    next: data => {
      console.log(data);
      this.published = data;
      console.log(this.published)
      this.tglLaporan = data[0].date_submitted;
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

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  
approve(index:any){
  console.log(index)
  let no = index.no_laporan;
  let body = {
    "no_laporan" : no
    }
  this.http.post<any>(this.global.address+this.global.laporanApprove, body, this.global.headers).subscribe({
    next: data => {
      console.log(data);
      let dot = data;
      if (dot.valid == 1){
        Swal.fire({  
          icon: 'info',  
          title: dot.result,  
          text: 'Laporan berhasil di Approve!',  
          background: '#fff',
        })
        this.ngOnInit;
        window.location.reload();
      }else{
        Swal.fire({  
          icon: 'warning',  
          title: dot.result,  
          text: '?',  
          background: '#fff',
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
    // const pdfTable = this.pdfTable.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html, pageSize: 'A4', pageOrientation: 'landscape', pageMargins: [ 10, 10, 10, 10 ]};
    // pdfMake.createPdf(documentDefinition).download(no+'.pdf');
  }

  simpanLaporan(){
    this.submitted = true;
    if (this.laporanForm.invalid) {
      return;
    }else{
      console.log(this.laporanForm.value);
      let date = new Date(this.laporanForm.value.tgl_laporan);
      console.log(this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss'));
      let Data = {
        "tgl_laporan" : this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
        "sub_kategori_id" : this.laporanForm.value.sub_kategori_id,
        "region_id" : this.laporanForm.value.region_id,
        "department_id" : this.laporanForm.value.department_id
      }
      this.http.post<any>(this.global.address+this.global.createLaporan, Data, this.global.headers).subscribe({
        next: data => {
          console.log(data);
          let dot = data;
          if (dot.valid == 1){
            Swal.fire({  
              icon: 'info',  
              title: dot.result,  
              text: 'Laporan berhasil di Tambah!',  
              background: '#fff',
            })
            this.ngOnInit;
            window.location.reload();
          }else{
            Swal.fire({  
              icon: 'warning',  
              title: dot.result,  
              text: 'Isian Laporan Tidak Valid',  
              background: '#fff',
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
    }
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }

  closeResult: string;
   
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  } 

  filterRegion(xx){
    console.log("WAAW :", xx.target.value);
    let id = xx.target.value
    // this.position = data;
    let dep = this.positions.filter(x => x.region_id == id);
    // console.log("filter", this.position);
    this.department = this.removeDuplicates(dep, "department_id");
    this.posi = this.removeDuplicates(dep, "position_id");
    // console.log("uniqueArray is: " + JSON.stringify(this.position));
    console.log("position",this.positions);
    console.log("department",this.department);
    console.log("posi",this.posi);

  }
}