import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilitystatsComponent } from './container/facilitystats.component';


const routes: Routes = [{
  path: '',
  component: FacilitystatsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitystatsRoutingModule { }
