import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
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
  menu: any;
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
  mapOptions: { zoom: number; scrollwheel: boolean; center: any; mapTypeId: any; styles: ({ elementType: string; stylers: { color: string; }[]; featureType?: undefined; } | { featureType: string; elementType: string; stylers: { color: string; }[]; })[]; };
  html: string;

  constructor(private http: HttpClient, private global: GlobalService, private formBuilder: FormBuilder) {
    this.formFilter1 = this.formBuilder.group({
      regions: this.formBuilder.array([], [Validators.required])
    })
    this.formFilter2 = this.formBuilder.group({
      subkategoris: this.formBuilder.array([], [Validators.required])
    })
  }
  
  ngOnInit() {
    this.html = "<h1>ASLJKHAKSDJHALSKDHLASKD</h1>"
    let map: google.maps.Map;

    function FilterControl(controlDiv: Element, map: google.maps.Map) {
      // Set CSS for the control border.
      const controlUI = document.createElement("div");
  
      controlUI.style.backgroundColor = "#E30016";
      controlUI.style.border = "1px solid #000";
      controlUI.style.borderRadius = "5px";
      controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
      controlUI.style.cursor = "pointer";
      controlUI.style.marginTop = "10px";
      controlUI.style.marginBottom = "22px";
      controlUI.style.marginRight = "8px";
      controlUI.style.textAlign = "center";
      controlUI.title = "Click to Filter map";
      controlDiv.appendChild(controlUI);
  
      // Set CSS for the control interior.
      const controlText = document.createElement("div");
  
      controlText.style.color = "rgb(25,25,25)";
      controlText.style.fontFamily = "Roboto,Arial,sans-serif";
      controlText.style.fontSize = "16px";
      controlText.style.lineHeight = "38px";
      controlText.style.paddingLeft = "15px";
      controlText.style.paddingRight = "15px";
      controlText.innerHTML = "<i class='fa fa-bars text-light'></i>";
      controlUI.appendChild(controlText);
  
      // Setup the click event listeners: simply set the map to Chicago.
      controlUI.addEventListener("click", () => {
        let element = document.getElementById("filterMenu");
        // console.log(element);
        // let hidden = element.style.visibility("none");  
        if (element.style.display === 'none'){
          element.style.display = 'block';
        }else{
          element.style.display = 'none';
        }
      });
    }
    
    function FilterMenu(controlDiv: Element, map: google.maps.Map) {    
      // Set CSS for the control border.
      const controlUI = document.createElement("div");
  
      // controlUI.style.backgroundColor = "#E30016";
      controlUI.style.border = "1px solid #000";
      controlUI.style.borderRadius = "5px";
      controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
      controlUI.style.cursor = "pointer";
      controlUI.style.marginTop = "-62px";
      controlUI.style.marginBottom = "22px";
      controlUI.style.marginRight = "55px";
      controlUI.style.textAlign = "left";
      controlUI.title = "Click to Filter map";
      controlDiv.appendChild(controlUI);
  
      // Set CSS for the control interior.
      const controlText = document.createElement("div");
  
      controlText.style.color = "rgb(25,25,25)";
      controlText.style.fontFamily = "Roboto,Arial,sans-serif";
      controlText.style.fontSize = "10px";
      controlText.style.lineHeight = "200px";
      controlText.style.paddingLeft = "0px";
      controlText.style.paddingRight = "0px";
      controlText.innerHTML = '<div id="filterMenu" class="card card-stats bg-gradient-dark text-light px-2 py-2" style="display: none"><form [formGroup]="formFilter1" id="filterRegion"><h5 class="text-light">Region</h5></form></div>';
      controlUI.appendChild(controlText);

    }

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
    let mapi = document.getElementById('map-canvas');
    let lat = mapi.getAttribute('data-lat');
    let lng = mapi.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    
    this.mapOptions = {
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
    map = new google.maps.Map(mapi, this.mapOptions);

    const filterControlDiv = document.createElement("div");
    FilterControl(filterControlDiv, map);
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(filterControlDiv);
    
    const filterMenuDiv = document.createElement("div");
    FilterMenu(filterMenuDiv, map);
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(filterMenuDiv);
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
    // let div = document.getElementById("zen");
    // console.log(div);
}
loadZen(){
  let div = document.getElementById("filterRegion");
  let div2 = document.getElementById("map-canvas");
  let cek = document.getElementsByClassName("ada");
  if (cek.length === 0){
    div2.setAttribute("class", "ada")
    let regi = this.region;
    div.insertAdjacentHTML('beforeend','<div class="form-check" *ngFor="let regi of region"><input class="form-check-input" type="checkbox" value="'+regi[0].id+'" (change)="checkRegion($event)"><label class="form-check-label" for="flexCheckDefault">'+regi[0].region_name+'</label><input class="form-check-input" type="checkbox" value="'+regi[1].id+'" (change)="checkRegion($event)"><label class="form-check-label" for="flexCheckDefault">'+regi[1].region_name+'</label></div>');
  }
  // console.log(div2);
    
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
  map = new google.maps.Map(map, this.mapOptions);
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
function html(html: any) {
  throw new Error('Function not implemented.');
}

