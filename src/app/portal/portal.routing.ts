import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './container/portal.component';


const routes: Routes = [
  {
    path:'',
    component: PortalComponent,
    children: [
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
        
      },
      {
        path:'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
