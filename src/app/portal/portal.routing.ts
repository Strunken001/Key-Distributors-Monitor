import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './container/portal.component';
import { RoleGuard } from 'Utilities/_guards/role-guard.service';
import { AuthGuard } from 'Utilities/_guards/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'

      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profiling',
        canActivate: [RoleGuard],
        data: {role: 'STAFF'},
        loadChildren: () => import('./profiling/profiling.module').then(m => m.ProfilingModule)
      },
      {
        path: 'facilitystats',
        loadChildren: () => import('./facilitystats/facilitystats.module').then(m => m.FacilitystatsModule)
      },
      {
        path: 'Upload',
        canActivate: [RoleGuard],
        data: {role: 'PRINCIPAL'},
        loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
