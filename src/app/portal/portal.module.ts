import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal.routing';
import { PortalComponent } from './container/portal.component';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ComponentsModule,

  ]
})
export class PortalModule { }
