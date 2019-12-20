import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  prinForm = new FormControl();
  disForm = new FormControl();
  startDate = new FormControl();
  endDate = new FormControl();

  date = new FormControl(new Date());
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
      name: 'Stock Value',
      data: [44, 55]
    }, {
      name: 'Trade Debt',
      data: [13, 23]
    }, {
      name: 'Total Stock',
      data: [11, 17]
    }],
    xaxis: {
      type: 'datetime',
      categories: ['05/01/2019 GMT', '06/02/2019 GMT'],
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

  allStocks$: Observable<any>

  constructor(public stockDetails: DashboardService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.allStocks$ = this.stockDetails.stock();
  }

  getStockDetails() {
    console.log(this.prinForm.value);
    console.log(this.disForm.value);
    console.log(this.startDate.value);
    console.log(this.endDate.value);
    this.stockDetails.StocDetailsCache$ = null;
    this.allStocks$ = this.stockDetails.stock(this.datepipe.transform(this.startDate.value, 'yyyy-MM-dd'),
    this.datepipe.transform(this.endDate.value, 'yyyy-MM-dd'), this.disForm.value, 'DISTRIBUTOR' );
  }
}
