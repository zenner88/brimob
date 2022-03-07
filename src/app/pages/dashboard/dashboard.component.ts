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

    // maps 
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
    var bandung = new google.maps.LatLng(-6.914864, 107.608238);
    var yogyakarta = new google.maps.LatLng(-7.797068, 110.370529);
    
    var marker1 = new google.maps.Marker({
        position: bandung,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        title: 'Bandung',
        options: {
          animation: google.maps.Animation.DROP,
          icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        }
    });
    var marker2 = new google.maps.Marker({
      position: yogyakarta,
      map: map,
      animation: google.maps.Animation.BOUNCE,
      title: 'Bandung',
      options: {
        animation: google.maps.Animation.DROP,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      }
  });

    var contentString = '<div class="info-window-content"><h2>Bandung</h2>' +
        '<p>Ini Bandung bro!</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker1, 'click', function() {
        infowindow.open(map, marker1);
    });
    google.maps.event.addListener(marker2, 'click', function() {
      infowindow.open(map, marker1);
  });
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
