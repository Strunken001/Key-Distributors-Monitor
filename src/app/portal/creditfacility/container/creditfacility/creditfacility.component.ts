import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';

@Component({
  selector: 'app-creditfacility',
  templateUrl: './creditfacility.component.html',
  styleUrls: ['./creditfacility.component.scss']
})
export class CreditfacilityComponent implements OnInit {
  @Input() allStocks$: Observable<any>
  constructor(public stockDetails: DashboardService) { }

  ngOnInit() {

  }

  callFetchStockServ(request: any) {
    this.allStocks$ = this.stockDetails.stock();
    // localStorage.setItem('fullStockDetails', JSON.stringify(this.allStocks$))

  }

}
