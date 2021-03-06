import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { MapInfoWindow } from '@angular/google-maps';
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
  regionId: any;
  kategoriId: any;
  formFilter0: FormGroup;
  formFilter1: FormGroup;
  formFilter2: FormGroup;
  mapOptions: { zoom: number; scrollwheel: boolean; center: any; mapTypeId: any; styles: ({ elementType: string; stylers: { color: string; }[]; featureType?: undefined; } | { featureType: string; elementType: string; stylers: { color: string; }[]; })[]; };
  html: string;
  map: any;
  device: any;
  deviceiId: any;
  zoom: number= 5;
  cctvMark: any = [];
  deviceInfo: any;
  contentString: string;
  lat: string;
  lng: string;
  lon: any;
  newMarkId: any;

  constructor(private http: HttpClient, private global: GlobalService, private formBuilder: FormBuilder) {
    this.formFilter0 = this.formBuilder.group({
      devices : this.formBuilder.array([], [Validators.required])
    })
    this.formFilter1 = this.formBuilder.group({
      regions: this.formBuilder.array([], [Validators.required])
    })
    this.formFilter2 = this.formBuilder.group({
      subkategoris: this.formBuilder.array([], [Validators.required])
    })
  }

ngOnInit() {
  this.loadKategori();
  this.loadRegion();
  this.loadDevice();
  
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
    controlText.style.lineHeight = "20px";
    controlText.style.paddingLeft = "-10px";
    controlText.style.paddingRight = "-10px";
    controlText.innerHTML = '<div id="filterMenu" class="card card-stats bg-gradient-dark text-light px-2 py-2" style="display: none"><div id="filterRegion"></div></div>';
    controlUI.appendChild(controlText);

  }
  // maps 
  let mapi = document.getElementById('map-canvas');
  this.lat = mapi.getAttribute('data-lat');
  this.lng = mapi.getAttribute('data-lng');

  var myLatlng = new google.maps.LatLng(this.lat, this.lng);
  this.mapOptions = {
      zoom: this.zoom,
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
  this.map = new google.maps.Map(mapi, this.mapOptions);

  const filterControlDiv = document.createElement("div");
  FilterControl(filterControlDiv, this.map);
  this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(filterControlDiv);
  
  const filterMenuDiv = document.createElement("div");
  FilterMenu(filterMenuDiv, this.map);
  this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(filterMenuDiv);

  // get maps laporan 
  if (this.kategoriId === undefined){
    this.kategoriId = [1,2,3,4,5,6];
  }
  if (this.regionId === undefined){
    this.regionId = [1];
  }
  console.log('region', this.regionId);
  console.log('kategori', this.kategoriId);
  let body = {      
    "level_user" : this.global.levelUser,
    "regions" : this.regionId,
    "subkategoris" : this.kategoriId,
    "start" : 0,
    "limit" : 1000,
    "sub_kategori_id" : 11,
    "status" : 0
  }; 
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

  let dataMap = this.workorders
  this.markers = dataMap
  
  // marker
  // this.markers.forEach(location => {
  // // custom logo for marker 
  // let markerLogo: string;
  // if (location.sub_kategori_id == 1){ 
  //   markerLogo='info.png';
  // }else{
  //   markerLogo='info.png';
  // }
  // marker 
  // var marker = new google.maps.Marker({
  //   position: new google.maps.LatLng(location.lat_pelapor, location.long_pelapor),
  //   map: this.map,
  //   options: {
  //     animation: google.maps.Animation.DROP,
  //     icon: "./assets/img/icons/"+markerLogo
  //   }
  // });
  // info window marker 
  // var contentString = '<div class="info-window-content"><h2>'+location.region_name+'</h2>' +
  // '<p>'+location.sub_kategori+'</p></div>';
  // var infowindow = new google.maps.InfoWindow({
  //     content: contentString
  // });
  // google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){ 
  //   return function() {
  //       infowindow.setContent(contentString);
  //       infowindow.open(this.map,marker);
  //   };
  // })
  // (marker,contentString,infowindow))
  // });
  // },
  // error: error => {
  //   this.errorMessage = error.message;
  //   console.error('There was an error!', error);
  //   if (error.status == 401 ){
  //     AuthInterceptor.signOut();
  //   }
  }
  })  
}

loadMaps(){
    // get maps laporan 
  if (this.kategoriId === undefined){
    this.kategoriId = [1,2,3,4,5,6];
  }
  if (this.regionId === undefined){
    this.regionId = [1];
  }
  console.log('region', this.regionId);
  console.log('kategori', this.kategoriId);
  let body = {      
    "level_user" : this.global.levelUser,
    "regions" : this.regionId,
    "subkategoris" : this.kategoriId,
    "start" : 0,
    "limit" : 1000,
    "sub_kategori_id" : 11,
    "status" : 0
  }; 
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

  let dataMap = this.workorders
  this.markers = dataMap
  
  // marker
  this.markers.forEach(location => {
  // custom logo for marker 
  let markerLogo: string;
  if (location.sub_kategori_id == 1){ 
    markerLogo='info.png';
  }else{
    markerLogo='info.png';
  }
  // marker 
  var icon = {
    url: "./assets/img/icons/"+markerLogo,
    scaledSize: new google.maps.Size(10, 10), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.lat_pelapor, location.long_pelapor),
    map: this.map,
    options: {
      animation: google.maps.Animation.DROP,
      icon: icon,
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
        infowindow.open(this.map,marker);
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

loadDeviceMark(){
  this.contentString = "";
  console.log('device', this.deviceiId);
  let body = {      
    "tracker_device_id" : this.deviceiId
  }; 
  this.http.post<any>(this.global.address+this.global.trackerLocation, body, this.global.headers).subscribe({
  next: data => {
  this.markers = [data];
  this.deviceInfo = data;
  console.log('tracker', this.markers);
  let id = this.markers.id
  // marker
  this.markers.forEach(location => {
  let cctvMark1 = new google.maps.Marker({
    position: new google.maps.LatLng(location.lat, location.lon),
    map: this.map,
    id: location.tracker_device_id,
    options: {
      animation: google.maps.Animation.DROP,
      icon: "./assets/img/icons/cctv_calm.png"
    }
  });
  this.cctvMark.push(cctvMark1);
  
  // info window marker 
  // cctvMark1.addListener("click", () => {
  //   console.log('klik', cctvMark1.id);
  //   this.newMarkId = cctvMark1.id;
  // })
  let body2 = {      
    "tracker_device_id" : cctvMark1.id
  }; 

  this.http.post<any>(this.global.address+this.global.trackerDevice, body2, this.global.headers).subscribe({
  next: data => {
  let device = data;
  
  this.contentString = '<div class="info-window-content"><h3>'+device.device_name+' ('+device.device_id+')</h3>' +
  '<iframe src="'+device.video_url+'" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><table border="0" style="width:100%"><tr><td>Device Type</td><td> : </td><td> '+device.device_type+'</td></tr><tr><td>Device Status</td><td> : </td><td> '+device.device_Status+'</td></tr><tr><td>Latitude</td><td> : </td><td> '+this.deviceInfo.lat+'</td></tr><tr><td>Longitude</td><td> : </td><td> '+this.deviceInfo.lon+'</td></tr><tr><td>Speed</td><td> : </td><td> '+this.deviceInfo.speed+'</td></tr></table></div>';
  
  var infowindow2 = new google.maps.InfoWindow({
    content: this.contentString
  });
  infowindow2.setContent(this.contentString);
  infowindow2.open(this.map,cctvMark1);

  this.map.setZoom(11);
  this.map.panTo(new google.maps.LatLng(location.lat, location.lon));
  // dibawah masih salah 
  cctvMark1.addListener("click", () => {
    infowindow2.setContent(this.contentString);
    infowindow2.open(this.map,cctvMark1);
    return
  })
  }})
  }
  );
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

loadZen(){
  let div = document.getElementById("filterRegion");
  let div2 = document.getElementById("map-canvas");
  let cek = document.getElementsByClassName("ada");
  if (cek.length === 0){
    div2.setAttribute("class", "ada")
    const filterItem = document.getElementById('filterz');
    div.insertAdjacentElement('afterbegin', filterItem);
  }    
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

loadDevice() {
  return this.http.get<any>(this.global.address+this.global.listDevices).subscribe({
    next: kate => {
    this.device = kate;
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

checkDevice(e){
  this.map.setZoom(5);
  this.map.panTo(new google.maps.LatLng(this.lat, this.lng));

  this.deviceiId = e.target.value;
  console.log("check!!!",e);
  console.log("check",this.deviceiId);
  let checked = e.target.checked;
  console.log('cctvMark bot', this.cctvMark);
  let markers = [];
  
  if (checked == true){
    this.loadDeviceMark();
  }else{
  console.log('cctvMark bot', this.cctvMark);

    // let marker = this.cctvMark.id
    // this.cctvMark.setMap(null);
    //Find and remove the marker from the Array
    for (var i = 0; i < this.cctvMark.length; i++) {
      if (this.cctvMark[i].id == this.deviceiId) {
          //Remove the marker from Map                  
          this.cctvMark[i].setMap(null);

          //Remove the marker from array.
          this.cctvMark.splice(i, 1);
          return;
      }
  }

}
}
}