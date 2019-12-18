import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';

@Component({
  selector: 'app-fetch-stock',
  templateUrl: './fetch-stock.component.html',
  styleUrls: ['./fetch-stock.component.scss']
})
export class FetchStockComponent implements OnInit {

  constructor( public stockDetails: DashboardService) { }

  ngOnInit() {
  }

}
