import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { WorkorderComponent } from '../../pages/workorder/workorder.component';
import { WorkorderAddComponent } from '../../pages/workorder-add/workorder-add.component';
import { UserAddComponent } from '../../pages/user-add/user-add.component';
import { CallcenterComponent } from '../../pages/callcenter/callcenter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    Ng2SearchPipeModule,
    NgHttpLoaderModule.forRoot(),
    GooglePlaceModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    WorkorderComponent,
    CallcenterComponent,
    WorkorderAddComponent,
    UserAddComponent
  ]
})

export class AdminLayoutModule {}
