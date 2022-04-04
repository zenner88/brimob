import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  errorMessage:any;
  collectionSize: number;
  workorders:any = [];
  open: any;
  opens:any = [];
  received: any;
  receiveds:any = [];
  onprocess: any;
  onprocesss:any = [];
  close: any;
  closes:any = [];
  total: any;
  totals:any = [];
  markers: any;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  
  constructor(private http: HttpClient, private global: GlobalService) { }
  
  ngOnInit() {
    // datatable      
    this.http.post<any>(this.global.address+this.global.workorder, this.global.body, this.global.headers).subscribe({
    next: data => {
      this.collectionSize = data.length;
      this.workorders = data;

      let open = data.filter(element => {
        return element.status == 1;
      })
      this.open = open.length;

      let received = data.filter(element => {
        return element.status == 2;
      })
      this.received = received.length;

      let onprocess = data.filter(element => {
        return element.status == 3;
      })
      this.onprocess = onprocess.length;

      let close = data.filter(element => {
        return element.status == 4;
      })
      this.close = close.length;

      // maps 
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');
    let dataMap = this.workorders
    console.log("datamap : ",dataMap[0].lat_pelapor);
    for (let mark of dataMap){
      // console.log("xxx : ",mark); 
      // this.markers = mark.lat_pelapor;
      // this.markers = { "lat" :mark.lat_pelapor, "lng" : mark.long_pelapor, "city" : mark.sub_kategori, "type" : 1};
      console.log("{lat:",mark.lat_pelapor,"lng:",mark.long_pelapor,"city:",mark.sub_kategori, "type:1}");
    }
    // this.markers = dataMark


    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 5,
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
    this.markers.forEach(location => {
      // custom logo for marker 
      let markerLogo: string;
      if (location.type == 1){ 
        markerLogo='info.png';
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
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        if (error.status == 401 ){
          AuthInterceptor.signOut();
        }
    }
    })
}}
