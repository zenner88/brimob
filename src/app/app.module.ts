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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpperCasePipe } from '@angular/common';
import { GlobalService } from './global.service';
import { GoogleMapsModule } from '@angular/google-maps';

registerLocaleData(localeId, 'id'); 

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
    Ng2SearchPipeModule,
    GoogleMapsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  providers: [ { provide: LOCALE_ID, useValue: "id-ID" }, authInterceptorProviders, UpperCasePipe, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
