import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './container/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialUiModule } from 'Utilities/_material/material-ui.module';
import { ComponentsModule } from 'app/components/components.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    MaterialUiModule,
    ComponentsModule

  ]
})
export class DashboardModule { }
