import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResponseDistributor, AllDistributor, User } from 'Utilities/_models/Interface';
import { ProfilingServiceService } from 'Services/Profiling-Services/profiling-service.service';
import { JsonPipe } from '@angular/common';
import { RolesService } from 'Services/utility-Services/roles.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-topview',
  templateUrl: './topview.component.html',
  styleUrls: ['./topview.component.scss']
})
export class TopviewComponent implements OnInit {

  distributors: any[];
  customerID = '';
  userDetails: User;
  isDistributor = true;
  isPrincipal = true;
  isStaff = true;

  @Output() triggerFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() prinForm: FormControl;
  @Input() disForm: FormControl;
  @Input() startDate: FormControl;
  @Input() endDate: FormControl;

  constructor(public profileserv: ProfilingServiceService,
    public roleServ: RolesService) {
    const user = localStorage.getItem('userInformation');
    if (user !== null) {
      this.customerID = JSON.parse(user).userInfor.customerID;
    }
  }

  ngOnInit() {
    if (this.customerID === '100000') {
      this.isStaff = false
    } else if (this.customerID === '' ) {
      this.isDistributor = false;
    } else {
      this.isPrincipal = false;
      this.onSelected(this.roleServ.getCodeOnLogin())
    }
  }

  onSelected(categoryId: string): void {
    console.log('Principal Code dist ' + categoryId)
    this.profileserv.fetchDistributors(categoryId).subscribe((res: ResponseDistributor) => {
      console.log('distributor selected change ' + JSON.stringify(res));
      if (res.responseCode === '00') {
        console.log('Principal ' + JSON.stringify(res.allDistributors))
        this.distributors = res.allDistributors;
      } else if (res.responseCode === '25') {
        res.allDistributors = [
        ];
        this.distributors = res.allDistributors;
      } else {
        console.log('fail ' + JSON.stringify(res))
        this.distributors = null;
      }
    });
  }

  // public fetchPrincipals() {

  //   this.profileserv.fetchPrincipals().subscribe((lists: ResponsePrincipals) => {
  //     console.log('ewa dshds ' + JSON.stringify(lists))
  //     for (const list of lists.allPrincipals) {
  //       this.foods = [
  //         {value: list.id, viewValue: list.customerID},
  //       ];
  //   }

  //   // this.foods = [ value :lists.allPrincipals]
  //   })
  // }

  getStockDetails() {
    this.triggerFilter.emit();
  }
}
