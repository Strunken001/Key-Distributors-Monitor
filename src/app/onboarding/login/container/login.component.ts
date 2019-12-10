import { Component, OnInit } from '@angular/core';
import { LoginService } from 'Services/Login-Service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidators } from 'Utilities/FormValidation';
import { ResponseDist, User } from 'Utilities/_models/Interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  get accessCode() {
    return this.form.get('accessCode');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get usernameDist() {
    return this.formDist.get('usernameDist');
  }

  get passwordDist() {
    return this.formDist.get('passwordDist');
  }

  TOKEN = 'sessionId';
  USERINFORMATION = 'userInformation';

  form: FormGroup;
  formDist: FormGroup;
  manufacturer = true;
  distributor = false;
  request: any;
  showLoader = false;

  constructor(private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.createManufacturerForm();
    this.createDistributorForm();
  }

  // for MAnufacturer form
  private createManufacturerForm() {
    this.form = new FormGroup({
      accessCode: new FormControl({ value: '', disabled: false }, [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });

  }
  // for Distributors form
  createDistributorForm() {
    this.formDist = new FormGroup({
      usernameDist: new FormControl('', [
        Validators.required
      ]),
      passwordDist: new FormControl('', [
        Validators.required
      ]),
    });
  }

  // manufacturer submit button
  SubmitForm() {

    if (this.form.invalid) {
      FormValidators.validateAllFormFields(this.form);
      return;
    }
    // this.loginForm.form.markAllAsTouched();
    console.log('form value' + JSON.stringify(this.form.value));
    this.loginService.login(this.form.value).subscribe((res: User) => {
      console.log('form submitted');
      console.log(JSON.stringify(res));
      if (res.responseCode === '00') {
        this.localStorageUserData(res);
      } else {
        this.toastr.show(res.responseDescription, 'Error', {
          positionClass: 'toast-bottom-right',
          toastClass: 'alert alert-danger alert-with-icon'
        });
        this.password.reset();
      }
    });
  }

  // Distributors submit button
  SubmitFormDist() {

    if (this.formDist.invalid) {
      FormValidators.validateAllFormFields(this.formDist);
      return;
    }

    this.showLoader = true;
    this.request = {
      username: this.formDist.value.usernameDist,
      password: this.formDist.value.passwordDist,
    };

    this.loginService.loginDistrib(this.request).subscribe((res: ResponseDist) => {
      console.log('form submitted');
      console.log(JSON.stringify(res));
      this.showLoader = false;
      if (res.responseCode === '00') {
        this.toastr.show('You have successfully logged in', 'Success!', {
          positionClass: 'toast-bottom-right',
          toastClass: 'alert alert-success alert-with-icon'
        });
        this.router.navigate(['/portal/dashboard']);
      } else {
        this.toastr.success(res.responseDescription, 'Error', {
          positionClass: 'toast-bottom-right',
          toastClass: 'alert alert-danger alert-with-icon',
        });
        this.passwordDist.reset();
      }
    });
  }

  localStorageUserData(userinfo: User) {
    localStorage.clear();
    localStorage.setItem(this.USERINFORMATION, JSON.stringify(userinfo));
    localStorage.setItem(this.TOKEN, userinfo.userInfor.sessionId);
    this.router.navigate(['portal']);
    this.toastr.show('You have successfully logged in', 'success', {
      positionClass: 'toast-bottom-right',
      toastClass: 'alert alert-success alert-with-icon'
    });
  }

}
