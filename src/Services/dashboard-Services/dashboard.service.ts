import { Injectable } from '@angular/core';
import { EncryptionService } from 'Services/utility-Services/encryption.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { StockResponse } from 'Utilities/_models/Interface';
import { catchError, retry, map, switchMap, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { ErrorHandlingService } from 'Services/utility-Services/error-handling.service';
import { timer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public StocDetailsCache$: Observable<StockResponse>;
  constructor(private enc: EncryptionService, private http: HttpClient,
    private errorhandler: ErrorHandlingService) { }

  private fetchStockDetails() {
    const userDetails = localStorage.getItem('userInformation');
    const userObj = JSON.parse(userDetails);
    const PATH = `${environment.BASE_URL}${environment.KDMonitor_Api}${'/FetchStockDetails'}`;
    const userRequest: any = {
      RequestId: this.enc.encrypt(this.enc.getRequestID()),
      Channel: environment.KDChannel,
      SessionId: '',
      StaffId: this.enc.encrypt(userObj.userInfor.userID),
      StartDate: '2019-01-01',
      EndDate: '2019-12-12',
      User: 'STAFF'
    };
    console.log('Stock request ' + JSON.stringify(userRequest))
    return this.http.post<any>(PATH, userRequest).pipe(
      retry(2),
      catchError(this.errorhandler.handleError),
      // tslint:disable-next-line: no-shadowed-variable
      map((res: StockResponse) => {
        console.log('Stock response ' + JSON.stringify(res) )
        if (res.responseCode === '00') {
          console.log('Stock response ' + JSON.stringify(res) )
          return res;
        } else {
          console.log('fail ' + JSON.stringify(res) )
          return null;
        }
      })
    );
  }

  get stock() {
    if (!this.StocDetailsCache$) {
       // this.paymentService.paymentInfo$.next('loading payment categories..');
      const timer$ = timer(0, environment.CACHE_SIZE); // timer that determines the interval before data refresh from server
      this.StocDetailsCache$ = timer$.pipe(
        distinctUntilChanged(),
        switchMap(_ => this.fetchStockDetails()), // Observable operator that makes data refresh
        shareReplay(environment.CACHE_SIZE) // Observable operator that handles caching
      );
    }
    return this.StocDetailsCache$;
  }
}
