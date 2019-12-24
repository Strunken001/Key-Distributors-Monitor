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
  month: string;
  position: number;
  StockValue: number;
  TradeDebt: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, month: 'Hydrogen', StockValue: 1.0079, TradeDebt: 'H' }
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
      name: 'Monthly Stock Utilized',
      // tslint:disable-next-line: radix
      data: [parseInt(this.getMonthlyUtilization().toString())],
    }],
    labels: [this.getUtilizationMonths().toString()],
    xaxis: {
      type: 'category',
      categories: [this.getUtilizationMonths().toString()],
      tickAmount: 6,
    },
    // xaxis: {
    //   type: 'datetime',
    //   min: new Date('01 Mar 2012').getTime(),
    //   tickAmount: 6,
    // },
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
    labels: ['% Utilization'],
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
    labels: ['% Efficiency'],

  }

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  allStocks$: Observable<any>
  mnthlyStocks$: Observable<any>
  constructor(public stockDetails: DashboardService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.allStocks$ = this.stockDetails.stock();
    this.mnthlyStocks$ = this.stockDetails.monthlyStock();
    this.getMonthlyUtilization()
    this.getUtilizationMonths()

  }

  getPercUtil() {
    const stockDet = localStorage.getItem('percentageUtil')
    const parsedStockDet = JSON.parse(stockDet)
    const percUtilization = parsedStockDet.percentageUtilization
    console.log('facility Info: ' + percUtilization)
    return percUtilization
  }

  getMonthlyUtilization() {
    const stockDet = localStorage.getItem('MonthlyStockDetails')
    console.log('MonthlyStockDetails: ', + stockDet)
    const parsedStockDet = JSON.parse(stockDet)
    // parsedStockDet.allMonthlyStockDetails = []
    console.log('Monthly Stock Parsed: ' + JSON.stringify(parsedStockDet.allMonthlyStockDetails[0].stockValue))
    const utilPArsed = new Array(parsedStockDet.allMonthlyStockDetails[0].stockValue)
    console.log('Final: ' + JSON.stringify(utilPArsed))
    return utilPArsed
  }

  getUtilizationMonths() {
    const stockDet = localStorage.getItem('MonthlyStockDetails')
    const parsedStockDet = JSON.parse(stockDet)
    // parsedStockDet.allMonthlyStockDetails.month = []
    console.log('Months Parsed: ' + JSON.stringify(parsedStockDet.allMonthlyStockDetails[0].month))
    const monthParsed = new Array(parsedStockDet.allMonthlyStockDetails[0].month)
    return monthParsed
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
  //       name: 'Total Amount Drawn',
  //       data: new Array(res.map(({stockValue}) => Number(stockValue)))[0]
  //     }];

  //     this.options.xaxis = {
  //       type: 'datetime',
  //       // categories: new Array(res.map(({month}) => (month)))[0]
  //       categories: new Array(res.map(({month}) => month))[0]
  //     };
  //     console.log(JSON.stringify(new Array(res.map(({month}) => (month)))[0]))
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
