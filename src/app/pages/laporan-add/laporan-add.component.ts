import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../_helpers/auth.interceptor';
import { GlobalService } from '../../global.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-laporan-add',
  templateUrl: './laporan-add.component.html',
  styleUrls: ['./laporan-add.component.scss']
})

export class LaporanAddComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  kategori : any;
  errorMessage : any; 
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private global: GlobalService,) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group(
      
      {
      no_laporan: [
        '',
          [
            Validators.required,
          ]
        ],
      sub_kategori_id: '',        
      status: 1,        
      laporan_text: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
        ]
      ],  
      lokasiLaporan: [
        '',
        [
          Validators.required,
        ]
      ],    
      lat_pelapor: '',        
      long_pelapor: '',        
      }
    );
  // Get Subkategori 
  this.http.get<any>(this.global.address+this.global.subKategori).subscribe({
    next: data => {
      this.kategori = data;
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
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.http.post<any>(this.global.address+this.global.tambahLaporan, this.form.value, this.global.headers).subscribe({
      next: data => {
        let valid = data.valid;
        if (valid == 1){
          Swal.fire({  
            icon: 'success',  
            title: 'Sukses',  
            text: 'Laporan berhasil ditambahkan!',  
            background: '#000000',
          })
          this.onReset();
        }
        else if (valid == 2){
          Swal.fire({  
            icon: 'error',  
            title: 'Error',  
            text: 'Error!',  
            background: '#000000',
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


