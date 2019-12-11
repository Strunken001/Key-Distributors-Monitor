import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilitystatsRoutingModule } from './facilitystats-routing.module';
import { FacilitystatsComponent } from './container/facilitystats.component';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NgApexchartsModule } from 'ng-apexcharts';


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
    ReactiveFormsModule
  ]
})
export class FacilitystatsModule { }
