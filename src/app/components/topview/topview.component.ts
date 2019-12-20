import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResponseDistributor, AllDistributor, User } from 'Utilities/_models/Interface';
import { ProfilingServiceService } from 'Services/Profiling-Services/profiling-service.service';
import { JsonPipe, DatePipe } from '@angular/common';
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
  disabledistdrp = true;
  currentDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
  backDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
  toDate = new FormControl(this.currentDate);
  fromDate = new FormControl(this.backDate);

  @Output() triggerFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input() prinForm: FormControl;
  @Input() disForm: FormControl;
  @Input() startDate: FormControl;
  @Input() endDate: FormControl;



  constructor(public profileserv: ProfilingServiceService,
    public roleServ: RolesService, public datepipe: DatePipe) {
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
    this.fromAndtoValueOnChange();
  }

  onSelected(categoryId: string): void {
    console.log('Principal Code dist ' + categoryId)
    this.profileserv.fetchDistributors(categoryId).subscribe((res: ResponseDistributor) => {
      console.log('distributor selected change ' + JSON.stringify(res));
      if (res.responseCode === '00') {
        this.disabledistdrp = false;
        console.log('Principal ' + JSON.stringify(res.allDistributors))
        this.distributors = res.allDistributors;
      } else if (res.responseCode === '25') {
        res.allDistributors = [

        ];
        this.distributors = res.allDistributors;
        this.disabledistdrp = true;
      } else {
        console.log('fail ' + JSON.stringify(res))
        this.distributors = null;
      }
    });
  }

  getStockDetails() {
    this.triggerFilter.emit();
  }

  fromAndtoValueOnChange() {
    this.toDate.valueChanges.subscribe(res => {
        if (new Date(res).setHours(0, 0, 0, 0) > new Date(this.currentDate).setHours(0, 0, 0, 0)) {
          this.toDate.reset(this.currentDate);
        }
    });

    this.fromDate.valueChanges.subscribe(res => {
      console.log(res);
      const backDate: any = new Date(this.toDate.value).setTime(new Date(this.toDate.value).getTime() - (4 * 24 * 60 * 60 * 1000));
      if (new Date(res).setHours(0, 0, 0, 0) > new Date(this.toDate.value).setHours(0, 0, 0, 0)) {
        this.fromDate.reset(new Date(backDate));
      }
    });
  }
}
