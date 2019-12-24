import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilingServiceService } from '../../../../Services/Profiling-Services/profiling-service.service';
import { Profiledist, ResponsePrincipals } from '../../../../Utilities/_models/Interface';
import { FormValidators } from '../../../../Utilities/FormValidation';

@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.scss']
})
export class ProfilingComponent implements OnInit {
  profileForm: FormGroup;
  selectedOption: string;
  // Principal: FormControl;
  options = [
    // {isDivider: true},
    {name: 'Action'},
    {name: 'Another action'},
    {name: 'Something else here'},
    {name: 'Separated link'}
   ];
  constructor(private formBuilder: FormBuilder, private router: Router, public profileserv: ProfilingServiceService) { }

  ngOnInit() {
    this.createProfilingForm();
  }

  private createProfilingForm() {
    this.profileForm = this.formBuilder.group({
      principal: new FormControl('', [Validators.required]),
      DistributorName: new FormControl('', [Validators.required]),
      DistributorFacNUBAN: new FormControl('', [Validators.required]),
      DistributorCode: new FormControl('', [Validators.required]),
      DistributorEmail: new FormControl('', [Validators.required])
    });
  }

  get principal() {
    return this.profileForm.get('principal');
  }
  get DistributorName() {
    return this.profileForm.get('DistributorName');
  }

  get DistributorFacNUBAN() {
    return this.profileForm.get('DistributorFacNUBAN');
  }
  get DistributorCode() {
    return this.profileForm.get('DistributorCode');
  }
  get DistributorEmail() {
    return this.profileForm.get('DistributorEmail');
  }

  public profile() {
    if (this.profileForm.invalid) {
      FormValidators.validateAllFormFields(this.profileForm);
      return;
    }
    this.profileForm.markAllAsTouched();
    const formdet = JSON.stringify(this.profileForm.value);
    console.log('Form Details: ' + formdet);
    this.profileserv.profileDistributor(this.profileForm.value).subscribe((a: Profiledist) => {
      console.log(a);
      this.profileForm.reset();
      // this.profileserv.setUserObject(a);
    });
  }

}
