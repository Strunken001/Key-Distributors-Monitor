import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload.routing';
import { UploadComponent } from './container/upload.component';
import { MaterialUiModule } from 'Utilities/_material/material-ui.module';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MaterialUiModule,
  ]
})
export class UploadModule { }
