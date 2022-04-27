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
  selector: 'app-laporan-big',
  templateUrl: './laporan-big.component.html',
  styleUrls: ['./laporan-big.component.scss']
})

export class LaporanBigComponent implements OnInit {
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
review(index:any){
  console.log(index)
  let no = index.no_laporan;
  let body = {
    "no_laporan" : no
    }
  this.http.post<any>(this.global.address+this.global.laporanReview, body).subscribe({
    next: data => {
      console.log(data);
      let dot = data;
      Swal.fire({  
        // icon: 'info',  
        title: 'No Laporan '+dot[0].no_laporan,  
        html: 'Kategori : '+dot[0].name+'<BR> Sub Kategori : '+dot[0].sub_kategori+'<BR> Status : '+dot[0].status,  
        background: '#fff',
      })
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
  }
  backToTable(){
    this.isShowTable = false;
    this.isShowDetalis = true;
    this.isShowHeader = false;
    this.isShowBack = true;
    this.tittle = "Laporan";
  }
  
  showHeader (){
      this.isShowTable = true;
      this.isShowDetalis = false;
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }
}