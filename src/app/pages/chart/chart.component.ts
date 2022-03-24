import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart: Chart;

  constructor() { }

  ngOnInit() {       
    this.init();
  }
  
  init() {
    let chart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      // series: [{
      //   name: 'Line 1',
      //   data: [1, 2, 3]
      // }]
    });
    chart.addPoint(4);
    this.chart = chart;
    chart.addPoint(5);
    setTimeout(() => {
      chart.addPoint(6);
    }, 2000);

    chart.ref$.subscribe(console.log);
  }
}