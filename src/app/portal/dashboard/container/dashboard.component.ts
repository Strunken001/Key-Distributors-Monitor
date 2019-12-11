import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  options = {
    chart: {
      height: 350,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    series: [{
      name: 'PRODUCT A',
      data: [44, 55, 41, 67, 22, 43]
    }, {
      name: 'PRODUCT B',
      data: [13, 23, 20, 8, 13, 27]
    }, {
      name: 'PRODUCT C',
      data: [11, 17, 15, 15, 21, 14]
    }, {
      name: 'PRODUCT D',
      data: [21, 7, 25, 13, 22, 8]
    }],
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    },

  }

  options2 = {
    chart: {
      height: 210,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
        }
      },
    },
    series: [70],
    labels: ['Cricket'],

  }

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
