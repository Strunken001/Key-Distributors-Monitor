import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
// import ApexCharts from 'apexcharts'
import * as ApexCharts from 'apexcharts'




export interface PeriodicElement {
  // Distributor: string;
  // StockHolding: number;
  // TradeDebt: number;
  // Total: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-facilitystats',
  templateUrl: './facilitystats.component.html',
  styleUrls: ['./facilitystats.component.scss']
})

export class FacilitystatsComponent implements OnInit {
  prinForm = new FormControl();
  disForm = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

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
      name: 'Monthly Percentage Utilized',
      data: [44, 55, 41, 67, 22, 43]
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
      height: 400,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '20%',
        }
      },
    },
    // series: [{ value: this.facilityInfo()}],
    // tslint:disable-next-line: radix
    series: [parseInt(this.getPercUtil()).toString()],
    labels: ['Progress'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]

  }

  options3 = {
    chart: {
      height: 400,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
        }
      },
    },
    // series: [{ value: this.facilityInfo()}],
    // tslint:disable-next-line: radix
    series: [parseInt(this.getPercEff()).toString()],
    labels: ['Progress'],

  }

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  allStocks$: Observable<any>
  constructor(public stockDetails: DashboardService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.allStocks$ = this.stockDetails.stock();

  }

  getPercUtil() {
    const stockDet = localStorage.getItem('fullStockDetails')
    const parsedStockDet = JSON.parse(stockDet)
    const percUtilization = parsedStockDet.percentageUtilization
    console.log('facility Info: ' + percUtilization)
    return percUtilization
  }

  getPercEff() {
    const stockDet = localStorage.getItem('fullStockDetails')
    const parsedStockDet = JSON.parse(stockDet)
    const percUtilization = parsedStockDet.percentageEfficiency
    console.log('facility Info: ' + percUtilization)
    return percUtilization
  }

  // allStocks() {
  //   this.stockDetails.monthlyStock().subscribe(res => {
  //     console.log(res);
  //     const myValue = new Array(res.map(({stockValue}) => Number(stockValue)))[0];
  //     console.log(myValue);
  //     this.options.series = [{
  //       name: 'Stock Value',
  //       data: new Array(res.map(({stockValue}) => Number(stockValue)))[0]
  //     }, {
  //       name: 'Trade Debt',
  //       data: new Array(res.map(({tradeDebt}) => Number(tradeDebt)))[0]
  //     }, {
  //       name: 'Total Stock',
  //       data: new Array(res.map(({totalStock}) => Number(totalStock)))[0]
  //     }];

  //     // this.options.xaxis = [{
  //     //   type: 'datetime',
  //     //   categories: new Array(res.map(({month}) => month))[0]
  //     // }];
  //     console.log(JSON.stringify(this.options))
  //   })


  // }

  renderChart() {
    const chart = new ApexCharts(document.querySelector('#chart'), this.options2);
    chart.render();
  }

  getStockDetails() {
    console.log(this.prinForm.value);
    console.log(this.disForm.value);
    console.log(this.startDate.value);
    console.log(this.endDate.value);
    this.stockDetails.StocDetailsCache$ = null;
    this.allStocks$ = this.stockDetails.stock(this.datepipe.transform(this.startDate.value, 'yyyy-MM-dd'),
      this.datepipe.transform(this.endDate.value, 'yyyy-MM-dd'), this.disForm.value, 'DISTRIBUTOR');
  }
}
