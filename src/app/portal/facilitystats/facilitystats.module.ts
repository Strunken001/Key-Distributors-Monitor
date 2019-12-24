import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitystatsRoutingModule } from './facilitystats-routing.module';
import { FacilitystatsComponent } from './container/facilitystats.component';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatDividerModule, MatTableModule } from '@angular/material';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from 'app/components/components.module';
import { CreditfacilityModule } from '../creditfacility/creditfacility.module';
import { CreditfacilityComponent } from '../creditfacility/container/creditfacility/creditfacility.component';

// import { TopviewComponent } from '../../components/topview/topview.component'
// import { FetchStockComponent } from 'app/components/fetch-stock/fetch-stock.component';

@NgModule({
  declarations: [FacilitystatsComponent],
  imports: [
    CommonModule,
    FacilitystatsRoutingModule,
    FormsModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDividerModule,
    ComponentsModule,
    CreditfacilityModule,
    MatTableModule
  ]
})
export class FacilitystatsModule { }
