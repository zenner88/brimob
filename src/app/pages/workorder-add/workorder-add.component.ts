import { Component, OnInit, ViewChild} from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-workorder-add',
  templateUrl: './workorder-add.component.html',
  styleUrls: ['./workorder-add.component.scss']
})

export class WorkorderAddComponent implements OnInit {
 
  constructor() { }

  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()

    // maps 
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');
    var myLatlng = new google.maps.LatLng(this.userLatitude, this.userLongitude);
    var mapOptions = {
        zoom: 10,
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
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.userLatitude, this.userLongitude),
      map: map,
      options: {
        animation: google.maps.Animation.BOUNCE,
        // icon: "../../../assets/img/icons/"+markerLogo
      }
    });
  }

  simpanPengaduan(){
    let noPengaduan = (<HTMLInputElement>document.getElementById("noPengaduan")).value;
    let namaPelapor = (<HTMLInputElement>document.getElementById("namaPelapor")).value;
    let telponPelapor = (<HTMLInputElement>document.getElementById("telponPelapor")).value;
    let kategori = (<HTMLInputElement>document.getElementById("kategori")).value;
    let jenisLaporan = (<HTMLInputElement>document.getElementById("jenisLaporan")).value;
    let isiPengaduan = (<HTMLInputElement>document.getElementById("isiPengaduan")).value;
    let lokasiKejadian = (<HTMLInputElement>document.getElementById("lokasiKejadian")).value;

    let gabung = [
      {
        noPengaduan : noPengaduan,
        namaPelapor : namaPelapor, 
        telponPelapor : telponPelapor,
        kategori : kategori,
        jenisLaporan : jenisLaporan,
        isiPengaduan : isiPengaduan,
        lokasiKejadian : lokasiKejadian,
        lat : this.userLatitude,
        lang : this.userLongitude
      }
    ];
    console.log(gabung); 
  }

  ngOnInit() {       
  }

}


