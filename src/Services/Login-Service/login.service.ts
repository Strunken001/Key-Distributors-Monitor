import { Injectable } from '@angular/core';
import { EncryptionService } from '../utility-Services/encryption.service';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { ErrorHandlingService } from '../utility-Services/error-handling.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { LoginInfo, User, LoginDist, ResponseDist } from 'Utilities/_models/Interface';
import { ProfilingServiceService } from 'Services/Profiling-Services/profiling-service.service';
import { DashboardService } from 'Services/dashboard-Services/dashboard.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = environment.BASE_URL + environment.AUTH_API + '/GapsLogin';
  loginDistUrl: string  = environment.BASE_URL + environment.KDMonitor_Api + '/KDLogin';

  constructor(private encryptData: EncryptionService,
              private err: ErrorHandlingService,
              private http: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private profilin: ProfilingServiceService ,
              private dashboard: DashboardService) { }

  login(data: LoginInfo) {
    data.accessCode = this.encryptData.encrypt(data.accessCode);
    data.username = this.encryptData.encrypt(data.username);
    data.password = this.encryptData.encrypt(data.password);
    data.requestId = this.encryptData.encrypt(this.encryptData.getRequestID());
    data.channel = environment.CHANNEL;
    data.token = '';
    data.sessionId = '';


    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(data));
    return this.http
      .post<any>(this.loginUrl, data, { headers })
      .pipe(
        retry(2),
        catchError(this.err.handleError),
        // tslint:disable-next-line: no-shadowed-variable
        map((res: User) => {
          return res;
        })
      );
  }

  loginDistrib(data: LoginDist) {

    data.username = this.encryptData.encrypt(data.username);
    data.password = this.encryptData.encrypt(data.password);
    data.Channel = environment.KDChannel;
    data.RequestId = this.encryptData.encrypt(this.encryptData.getRequestID());
    data.SessionId = '';

    console.log('Request Id ' + this.encryptData.decrypt(data.RequestId));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(data));
    return this.http
      .post<any>(this.loginDistUrl, data, { headers })
      .pipe(
        retry(2),
        catchError(this.err.handleError),
        map((res: ResponseDist) => {
          return res;
        })
      );
    }

    clear(): void {
      localStorage.clear();
      this.profilin.paymentCategoriesCache$ = null
      this.dashboard.StocDetailsCache$ = null
      this.dashboard.MnthlyStocDetailsCache$ = null
    }

    logout(): void {
      this.clear();
      this.router.navigate(['onboarding/login']);
    }
}
