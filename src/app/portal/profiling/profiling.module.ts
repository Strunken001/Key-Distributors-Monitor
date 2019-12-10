import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilingRoutingModule } from './profiling-routing.module';
import { ProfilingComponent } from './container/profiling.component';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [ProfilingComponent],
  imports: [
    CommonModule,
    ProfilingRoutingModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ]
})
export class ProfilingModule { }
