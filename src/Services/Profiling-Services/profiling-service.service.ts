import { Injectable } from '@angular/core';
import { EncryptionService } from '../utility-Services/encryption.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { ErrorHandlingService } from '../utility-Services/error-handling.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilingServiceService {
  // RequestId: string;
  // Channel: string;
  // UserId: string;
  constructor(private enc: EncryptionService, private toaster: ToastrService,
    private http: HttpClient, private errorhandler: ErrorHandlingService) { }

  public profileDistributor(principal) {
    const PATH = `${environment.BASE_URL}${environment.KDMonitor_Api}${'/KDDistributor'}`;
    const body: any = {};

    if (principal) {

      const rawreq = this.enc.getRequestID;
      console.log('Raw Request ID::' + JSON.stringify(rawreq));
      principal.RequestId = this.enc.encrypt(this.enc.getRequestID());
      principal.Channel = 'KD';
      const userDetails = localStorage.getItem('userInformation');
      const userObj = JSON.parse(userDetails);
      console.log('Adeolu beans ' + JSON.stringify(userObj.userInfor.userID));
      principal.PrincipalCode = this.enc.encrypt(userObj.userInfor.userID);
      principal.AddedBy = this.enc.encrypt(userObj.userInfor.firstName + ' ' + userObj.userInfor.lastName);
      principal.DistributorName = this.enc.encrypt(principal.DistributorName);
      principal.DistributorFacNUBAN = this.enc.encrypt(principal.DistributorFacNUBAN);
      principal.DistributorCode = this.enc.encrypt(principal.DistributorCode);
      principal.DistributorEmail = this.enc.encrypt(principal.DistributorEmail);
      delete principal.principal;
      console.log('Data for distributor profiling:' + JSON.stringify(principal));
      console.log('requestId ' + JSON.stringify(this.enc.decrypt(principal.RequestId)));

      return this.http.post<any>(PATH, principal).pipe(
        retry(2),
        catchError(this.errorhandler.handleError),
        // tslint:disable-next-line: no-shadowed-variable
        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.toaster.show(res.responseDescription, 'Success!', {
              positionClass: 'toast-bottom-right',
              toastClass: 'alert alert-success alert-with-icon'
            });
            return res;
          } else {
            this.toaster.show(res.responseDescription, 'Error!', {
              positionClass: 'toast-bottom-right',
              toastClass: 'alert alert-danger alert-with-icon'
            });
            return null;
          }
        })
      );
    } else {

    }
  }

  fetchPrincipals() {
    const rawreq = this.enc.getRequestID;
    console.log('Principal Request ID::' + JSON.stringify(rawreq));
    const userDetails = localStorage.getItem('userInformation');
    const userObj = JSON.parse(userDetails);
    const PATH = `${environment.BASE_URL}${environment.KDMonitor_Api}${'/FetchAllPrincipals'}`;
    const userRequest: any = {
      RequestId: this.enc.encrypt(this.enc.getRequestID()),
      Channel: 'KD',
      UserId: this.enc.encrypt(userObj.userInfor.userID)

    };
    console.log('Data for distributor profiling:' + JSON.stringify(userRequest));
    return this.http.post<any>(PATH, userRequest).pipe(
      retry(2),
      catchError(this.errorhandler.handleError),
      // tslint:disable-next-line: no-shadowed-variable
      map(res => {
        console.log(res);
        if (res.ResponseCode === '00') {
          console.log(res.responseDescription);
          return res;
        } else {
          console.log(res.responseDescription);
          return null;
        }
      })
    );

  }

}
