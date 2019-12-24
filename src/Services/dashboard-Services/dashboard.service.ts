import { Injectable } from '@angular/core';
import { EncryptionService } from 'Services/utility-Services/encryption.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { StockResponse } from 'Utilities/_models/Interface';
import { catchError, retry, map, switchMap, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { ErrorHandlingService } from 'Services/utility-Services/error-handling.service';
import { timer, Observable } from 'rxjs';
import { RolesService } from 'Services/utility-Services/roles.service';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public StocDetailsCache$: Observable<StockResponse>;
  constructor(private enc: EncryptionService, private http: HttpClient,
    private errorhandler: ErrorHandlingService, private roles: RolesService,
    public datepipe: DatePipe) { }

  fetchStockDetails(startDate?: any, endDate?: any, code?: any, type?: any) {
    console.log('Stock code passed' + code)
    const date = new Date();
    const userDetails = localStorage.getItem('userInformation');
    const userObj = JSON.parse(userDetails);
    const PATH = `${environment.BASE_URL}${environment.KDMonitor_Api}${'/FetchStockDetails'}`;
    const userRequest: any = {
      RequestId: this.enc.encrypt(this.enc.getRequestID()),
      Channel: environment.KDChannel,
      SessionId: '',
      Code: code ? this.enc.encrypt(code) : this.enc.encrypt(this.roles.getCodeOnLogin()),
      StartDate: startDate ? startDate : this.datepipe.transform(date.setDate(7), 'yyyy-MM-dd') ,
      EndDate: endDate ? endDate : this.datepipe.transform(Date.now(), 'yyyy-MM-dd') ,
      User: type ? type : this.roles.DetermineRoles()
    };

    console.log('Stock code login' + this.roles.getCodeOnLogin())
    console.log('Stock request ' + JSON.stringify(userRequest))
    return this.http.post<any>(PATH, userRequest).pipe(
      retry(2),
      catchError(this.errorhandler.handleError),
      // tslint:disable-next-line: no-shadowed-variable
      map((res: StockResponse) => {
        console.log('Stock response ' + JSON.stringify(res))
        if (res.responseCode === '00') {
          console.log('Stock response ' + JSON.stringify(res) )
          localStorage.setItem('fullStockDetails', JSON.stringify(res))
          return res;
        } else if (res.responseCode === '25') {
          res.availedFacilityAmount = '0';
          res.totalStock = '0';
          res.usedFacilityAmount = '0';
          res.distributorCount = 'No Record';
          res.tradeDebt = '0';
          res.stockValue = '0';
          return res;
        } else {
          console.log('fail ' + JSON.stringify(res) )
          return null;
        }
      })
    );
  }

  stock(startDate?: any, endDate?: any, code?: any, type?: any) {
    if (!this.StocDetailsCache$) {
       // this.paymentService.paymentInfo$.next('loading payment categories..');
      const timer$ = timer(0, environment.CACHE_SIZE); // timer that determines the interval before data refresh from server
      this.StocDetailsCache$ = timer$.pipe(
        distinctUntilChanged(),
        // switchMap(_ => startDate && endDate &&
        //   code ? this.fetchStockDetails()
        //   : this.fetchStockDetails(startDate, endDate, code)),
          switchMap(_ => this.fetchStockDetails(startDate, endDate, code, type)), // Observable operator that makes data refresh
        shareReplay(environment.CACHE_SIZE) // Observable operator that handles caching
      );
    }
    return this.StocDetailsCache$;
  }
}
