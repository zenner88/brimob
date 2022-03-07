import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  
  ngOnInit() {
    // maps 
    let map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');
    let markers = [
      { lat: -6.914864, lng: 107.608238, city: "bandung" },
      { lat: -7.797068, lng: 110.370529, city: "Yogyakarta" },
      { lat: -6.923700, lng: 106.928726, city: "Sukabumi" },
      { lat: 3.597031, lng: 98.678513, city: "Medan" },
      { lat: -1.269160, lng: 116.825264, city: "Balikpapan" },
    ];
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 5,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
          {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
          {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
          {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
          {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
          {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
          {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
    }

    map = new google.maps.Map(map, mapOptions);
    // var bandung = new google.maps.LatLng(-6.914864, 107.608238);
    // var yogyakarta = new google.maps.LatLng(-7.797068, 110.370529);
    markers.forEach(location => {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
        animation: google.maps.Animation.BOUNCE,
        options: {
          animation: google.maps.Animation.DROP,
          icon: '../../../assets/img/icons/accident-logo.png'
        }
      });

      var contentString = '<div class="info-window-content"><h2>Bandung</h2>' +
      '<p>Ini Bandung bro!</p></div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      google.maps.event.addListener(markers, 'click', function() {
          infowindow.open(map, markers);
      });
  });
  // end maps 


    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
