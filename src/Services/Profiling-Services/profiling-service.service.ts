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
}
