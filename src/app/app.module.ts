import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id'; 
registerLocaleData(localeId, 'id'); 
import { ListFilterPipe } from './_helpers/listFilterPipe';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    DataTablesModule,
    NgHttpLoaderModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ListFilterPipe
  ],
  providers: [ { provide: LOCALE_ID, useValue: "id-ID" }, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
