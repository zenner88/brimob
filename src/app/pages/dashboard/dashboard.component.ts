import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { maps } from 'highcharts';
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
  kategori: number;
  region: number;
  totals:any = [];
  markers: any;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  regionId:number;
  kategoriId:number;
  formFilter1: FormGroup;
  formFilter2: FormGroup;

  constructor(private http: HttpClient, private global: GlobalService, private formBuilder: FormBuilder) {
    this.formFilter1 = this.formBuilder.group({
      regions: this.formBuilder.array([], [Validators.required])
    })
    this.formFilter2 = this.formBuilder.group({
      subkategoris: this.formBuilder.array([], [Validators.required])
    })
  }
  
  ngOnInit() {
    this.loadRegion();
    this.loadKategori();
    let body = {      
      "level_user" : this.global.levelUser,
      "regions" : [1],
      "subkategoris" : [1,2,3,4,5,6],
      "start" : 0,
      "limit" : 1000,
      "sub_kategori_id" : 11,
      "status" : 0
    }; 
 
    // get maps laporan 
    this.http.post<any>(this.global.address+this.global.mapLaporan, body, this.global.headers).subscribe({
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
    let dataMap = this.workorders
    this.markers = dataMap
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    
    var mapOptions = {
        zoom: 5,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
    }
    map = new google.maps.Map(map, mapOptions);
    this.markers.forEach(location => {
    // custom logo for marker 
    let markerLogo: string;
    if (location.sub_kategori_id == 1){ 
      markerLogo='info.png';
    }else{
      markerLogo='info.png';
    }
    // marker 
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat_pelapor, location.long_pelapor),
      map: map,
      options: {
        animation: google.maps.Animation.DROP,
        icon: "./assets/img/icons/"+markerLogo
      }
    });
    // info window marker 
    var contentString = '<div class="info-window-content"><h2>'+location.region_name+'</h2>' +
    '<p>'+location.sub_kategori+'</p></div>';
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
}

loadMaps(){
  let body = {      
    "level_user" : this.global.levelUser,
    "regions" : this.regionId,
    "subkategoris" : this.kategoriId,
    "start" : 0,
    "limit" : 1000,
    "sub_kategori_id" : 11,
    "status" : 0
  }; 

  // get maps laporan 
  this.http.post<any>(this.global.address+this.global.mapLaporan, body, this.global.headers).subscribe({
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
  let dataMap = this.workorders
  this.markers = dataMap
  let map = document.getElementById('map-canvas');
  let lat = map.getAttribute('data-lat');
  let lng = map.getAttribute('data-lng');

  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
      zoom: 5,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
  }
  map = new google.maps.Map(map, mapOptions);
  this.markers.forEach(location => {
  // custom logo for marker 
  let markerLogo: string;
  if (location.sub_kategori_id == 1){ 
    markerLogo='info.png';
  }else{
    markerLogo='info.png';
  }
  // marker 
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.lat_pelapor, location.long_pelapor),
    map: map,
    options: {
      animation: google.maps.Animation.DROP,
      icon: "./assets/img/icons/"+markerLogo
    }
  });
  // info window marker 
  var contentString = '<div class="info-window-content"><h2>'+location.region_name+'</h2>' +
  '<p>'+location.sub_kategori+'</p></div>';
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
}
loadRegion() {
  return this.http.get<any>(this.global.address+this.global.region).subscribe({
    next: regi => {
    this.region = regi;
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

loadKategori() {
  return this.http.get<any>(this.global.address+this.global.subKategori).subscribe({
    next: kate => {
    this.kategori = kate;
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

checkRegion(e){
  const website: FormArray = this.formFilter1.get('regions') as FormArray;

  if (e.target.checked) {
    website.push(new FormControl(e.target.value));
  } else {
     const index = website.controls.findIndex(x => x.value === e.target.value);
     website.removeAt(index);
  }
  this.regionId = this.formFilter1.value.regions.map(i=>Number(i));
  console.log(this.regionId);
  this.loadMaps();
}

checkKategori(e){
  const website: FormArray = this.formFilter2.get('subkategoris') as FormArray;

  if (e.target.checked) {
    website.push(new FormControl(e.target.value));
  } else {
     const index = website.controls.findIndex(x => x.value === e.target.value);
     website.removeAt(index);
  }
  this.kategoriId = this.formFilter2.value.subkategoris.map(i=>Number(i));
  console.log(this.kategoriId);
  this.loadMaps();
}
}
