import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
declare global {
  interface Window {
    initMap: () => void;
  }
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private root: am5.Root;
  private root2: am5.Root;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

  ngOnInit() {
   
  }
  
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // BAR CHART 
    // Chart code goes in here
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      // Define data
      let data = [
        {
          category: "Research",
          value1: 1000,
          value2: 588
        },
        {
          category: "Marketing",
          value1: 1200,
          value2: 1800
        },
        {
          category: "Sales",
          value1: 850,
          value2: 1230
        }
      ];

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );

      // Create X-Axis
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          categoryField: "category"
        })
      );
      xAxis.data.setAll(data);

      // Create series
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value1",
          categoryXField: "category"
        })
      );
      series1.data.setAll(data);

      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value2",
          categoryXField: "category"
        })
      );
      series2.data.setAll(data);

      // Add legend
      let legend = chart.children.push(am5.Legend.new(root, {}));
      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      this.root = root;
    });


// PIE CHART 1
// Create root and chart
  var root = am5.Root.new("pie1");

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  var chart = root.container.children.push( 
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout
    }) 
  );

  // Define data
  var data = [{
    country: "France",
    sales: 100000
  }, {
    country: "Spain",
    sales: 160000
  }, {
    country: "United Kingdom",
    sales: 80000
  }];

  // Create series
  var series = chart.series.push(
    am5percent.PieSeries.new(root, {
      name: "Series",
      valueField: "sales",
      categoryField: "country"
    })
  );
  series.data.setAll(data);

  // Add legend
  var legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
  }));

  legend.data.setAll(series.dataItems);
// ________________________________________________________________________________________________
  // PIE CHART 2
  // Create root and chart
  var root2 = am5.Root.new("pie2");

  root2.setThemes([
    am5themes_Animated.new(root2)
  ]);

  var chart2 = root2.container.children.push( 
    am5percent.PieChart.new(root2, {
      layout: root2.verticalLayout
    }) 
  );

  // Define data
  var data = [{
    country: "France",
    sales: 100000
  }, {
    country: "Spain",
    sales: 160000
  }, {
    country: "United Kingdom",
    sales: 80000
  }];

  // Create series
  var series = chart2.series.push(
    am5percent.PieSeries.new(root2, {
      name: "Series",
      valueField: "sales",
      categoryField: "country"
    })
  );
  series.data.setAll(data);

  // Add legend
  var legend = chart2.children.push(am5.Legend.new(root2, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root2.horizontalLayout
  }));

  legend.data.setAll(series.dataItems);
}

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}