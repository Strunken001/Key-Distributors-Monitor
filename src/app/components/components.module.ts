import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopviewComponent } from './topview/topview.component';
import { MaterialUiModule } from 'Utilities/_material/material-ui.module';
import { FetchStockComponent } from './fetch-stock/fetch-stock.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialUiModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    TopviewComponent,
    FetchStockComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    TopviewComponent,
    FetchStockComponent
  ]
})
export class ComponentsModule { }
