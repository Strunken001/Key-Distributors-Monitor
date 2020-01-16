import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ResponseDistributor } from 'Utilities/_models/Interface';
import { ProfilingServiceService } from 'Services/Profiling-Services/profiling-service.service';
import { takeUntil } from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // @ViewChild('chartObj', { static: false }) chart: ChartComponent;
  prinForm = new FormControl();
  disForm = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();
  distributor: ResponseDistributor;
  stockVal: any;
  date = new FormControl(new Date());
  percntUtil = 0;
  percntEff = 0;
  distributors: any[];

  options: any = {
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
    series: [
    //   {
    //   name: 'Stock Value',
    //   data: [10]
    // }, {
    //   name: 'Trade Debt',
    //   data: [12]
    // }, {
    //   name: 'Total Stock',
    //   data: [14]
    // }
  ],
    xaxis: {
      // type: 'datetime',
      categories: ['JAN'],
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    },
    // autoUpdateSeries: true
  };

  options2 = {
    chart: {
      height: 260,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        }
      },
    },
    series: [],
    labels: ['% Efficiency'],

  }

  options3 = {
    chart: {
      height: 260,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
        }
      },
    },
    series: [],
    labels: ['% Utilization'],

  }


  allStocks$: Observable<any>
  mnthlyStocks$: Observable<any>

  constructor(public stockDetails: DashboardService, public datepipe: DatePipe,
    private cd: ChangeDetectorRef, public profileserv: ProfilingServiceService) { }

  ngOnInit() {
     this.mnthlyStocks$ = this.stockDetails.monthlyStock();
     this.allStocks$ = this.stockDetails.stock();
    // this.generateGraphArray();
     this.allStocks();
     this.getBarchartUtilDetails()

  }




  allStocks() {
    this.stockDetails.monthlyStock().pipe(takeUntil(componentDestroyed(this))).subscribe(res => {
      console.log(res);
      const myValue = new Array(res.map(({stockValue}) => Number(stockValue)))[0];
      console.log(myValue);
      this.options.series = [{
        name: 'Stock Value',
        data: new Array(res.map(({stockValue}) => Number(stockValue)))[0]
      }, {
        name: 'Trade Debt',
        data: new Array(res.map(({tradeDebt}) => Number(tradeDebt)))[0]
      }, {
        name: 'Total Stock',
        data: new Array(res.map(({totalStock}) => Number(totalStock)))[0]
      }];

      this.options.xaxis = {
        // categories: new Array(res.map(({month}) => (month)))[0]
        categories: new Array(res.map(({month}) => month))[0]
      };
      console.log(JSON.stringify(new Array(res.map(({month}) => (month)))[0]))
    })


  }

  getStockDetails() {
    console.log(this.prinForm.value);
    console.log(this.disForm.value);
    console.log(this.startDate.value);
    console.log(this.endDate.value);
    this.stockDetails.StocDetailsCache$ = null;
    this.stockDetails.MnthlyStocDetailsCache$ = null;
    this.allStocks$ = this.stockDetails.stock(this.datepipe.transform(this.startDate.value, 'yyyy-MM-dd'),
    this.datepipe.transform(this.endDate.value, 'yyyy-MM-dd'), this.disForm.value, 'DISTRIBUTOR' );
    this.mnthlyStocks$ = this.stockDetails.monthlyStock(this.datepipe.transform(this.startDate.value, 'yyyy-MM-dd'),
    this.datepipe.transform(this.endDate.value, 'yyyy-MM-dd'), this.disForm.value, 'DISTRIBUTOR' );
    this.allStocks();
    this.getBarchartUtilDetails()
  }

  getMnthlyStockDetails() {

    this.stockDetails.MnthlyStocDetailsCache$ = null;
    this.allStocks$ = this.stockDetails.monthlyStock(this.datepipe.transform(this.startDate.value, 'yyyy-MM-dd'),
    this.datepipe.transform(this.endDate.value, 'yyyy-MM-dd'), this.disForm.value, 'DISTRIBUTOR' );
  }

  getBarchartUtilDetails() {

    this.stockDetails.MnthlyStocDetailsCache$ = null;
    this.allStocks$.pipe(takeUntil(componentDestroyed(this))).subscribe(res => {

      console.log('p EFF' + JSON.stringify(res))

        this.options3.series = [res.percentageUtilization]
        this.options2.series = [res.percentageEfficiency]
    })
  }


  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
  }

}
