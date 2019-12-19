import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ProfilingModule } from './portal/profiling/profiling.module'
import { MaterialUiModule } from 'Utilities/_material/material-ui.module';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({toastClass: 'toast toast-bootstrap-compatibility-fix'}),
    ProfilingModule,
    MaterialUiModule
  ],
  declarations: [
    AppComponent,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
