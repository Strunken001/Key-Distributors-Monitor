import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilingComponent } from './container/profiling.component';


const routes: Routes = [
  {
    path: '',
    component: ProfilingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilingRoutingModule { }
