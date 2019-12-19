import { Injectable } from '@angular/core';
import { User } from 'Utilities/_models/Interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  customerID = '';
  userDetails: User;
  isDistributor = false;
  isPrincipal = false;
  isStaff = false;
  constructor() {
  }

  DetermineRoles() {
    const user = localStorage.getItem('userInformation');
    if (user !== null) {
      this.customerID  = JSON.parse(user).userInfor.customerID;
      console.log('roles ' + this.customerID)
    }

    if (this.customerID === '100000') {
      this.isStaff = true
    } else if (this.customerID === '' ) {
      this.isDistributor = true;
    } else {
      this.isPrincipal = true;
    }
  }

}
