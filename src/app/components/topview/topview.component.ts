import { Component, OnInit } from '@angular/core';
import {  ResponsePrincipals } from 'Utilities/_models/Interface';
import { ProfilingServiceService } from 'Services/Profiling-Services/profiling-service.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-topview',
  templateUrl: './topview.component.html',
  styleUrls: ['./topview.component.scss']
})
export class TopviewComponent implements OnInit {

  foods: any[];

  constructor(public profileserv: ProfilingServiceService) { }

  ngOnInit() {

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

}
