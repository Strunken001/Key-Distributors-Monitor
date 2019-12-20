import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-stock',
  templateUrl: './fetch-stock.component.html',
  styleUrls: ['./fetch-stock.component.scss']
})
export class FetchStockComponent implements OnInit {
  // date = new Date();
  // request = {
  //   StartDate: this.date.setDate(7) ,
  //   EndDate: Date.now,
  //   User: this.roles.DetermineRoles()
  // }
  @Input() allStocks$: Observable<any>
  constructor(public stockDetails: DashboardService) { }

  ngOnInit() {
  }

  callFetchStockServ(request: any) {
    this.allStocks$ = this.stockDetails.stock();
  }

}
