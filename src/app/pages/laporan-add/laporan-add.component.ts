import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-laporan-add',
  templateUrl: './laporan-add.component.html',
  styleUrls: ['./laporan-add.component.scss']
})

export class LaporanAddComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group(
      
      {
      noPengaduan: ['1234567890'],  
      namaPelapor: [
        '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],
      telponPelapor: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
        ]
      ],  
      kategori: '',  
      jenisLaporan: '',        
      isiPengaduan: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
        ]
      ],  
      lokasiKejadian: [
        '',
        [
          Validators.required,
        ]
      ],  
      lat: '',        
      lang: '',        
      }
    );
  
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()

    // maps 
    let map = document.getElementById('map-canvas');
    var myLatlng = new google.maps.LatLng(this.userLatitude, this.userLongitude);
    var mapOptions = {
        zoom: 12,
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
    new google.maps.Marker({
      position: new google.maps.LatLng(this.userLatitude, this.userLongitude),
      map: map,
      options: {
        animation: google.maps.Animation.BOUNCE,
        // icon: "../../../assets/img/icons/"+markerLogo
      }
    });
  }

}


