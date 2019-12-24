import { Injectable } from '@angular/core';
import { LoginService } from 'Services/Login-Service/login.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private clr: LoginService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (JSON.parse(localStorage.getItem('userInformation')) !== null || JSON.parse(localStorage.getItem('distribInformation')) !== null) {
      return true;
    }

    // navigate to not found page
    this.clr.logout();
    return false;
  }
}
