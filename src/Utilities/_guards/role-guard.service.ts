import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from 'Services/utility-Services/roles.service';
import { LoginService } from 'Services/Login-Service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _router: Router, private roles: RolesService
    , private clr: LoginService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.roles.DetermineRoles();

    if (user === next.data.role) {
      return true;
    }

    // navigate to not found page
    this.clr.logout();
    return false;
  }
}
