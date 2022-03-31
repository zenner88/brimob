import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
declare const google: any;

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.scss']
})

export class LaporanComponent implements OnInit {
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
    this.http.post<any>(this.global.address+this.global.workorder, this.global.body, this.global.headers).subscribe({
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
          {"featureType":"landscape","elementType":"all","stylers":[{"color":"#FCFCC1"}]},
          {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
          {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
          {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
          {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"water","elementType":"all","stylers":[{"color":'#212529'},{"visibility":"on"}]}]
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
}