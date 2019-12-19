import { Injectable } from '@angular/core';
import { User } from 'Utilities/_models/Interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  customerID = '';
  userDetails: User;
  roles = '';
  code = '';
  constructor() {
  }

  DetermineRoles() {
    const user = localStorage.getItem('userInformation');
    if (user !== null) {
      this.customerID  = JSON.parse(user).userInfor.customerID;
      console.log('roles ' + this.customerID)
    }
    if (this.customerID === '100000') {
     this.roles = 'STAFF'
    } else if (this.customerID === '' ) {
      this.roles = 'DISTRIBUTOR';
    } else {
      this.roles = 'PRINCIPAL';
    }

    return this.roles;
  }

  getCodeOnLogin() {
    const user = localStorage.getItem('userInformation');
    const dist = localStorage.getItem('distribInformation');
    if (user !== null) {
      this.customerID  = JSON.parse(user).userInfor.customerID;
      console.log('roles ' + this.customerID)
    } else {

    }
    if (this.customerID === '100000') {
     this.code = JSON.parse(user).userInfor.userID
    } else if (this.customerID === '' ) {
      this.code = JSON.parse(dist).distributorCode;
    } else {
      this.code = this.customerID;
    }

    return this.code;
  }

}
