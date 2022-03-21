import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { WorkorderComponent } from 'src/app/pages/workorder/workorder.component';
import { CallcenterComponent } from 'src/app/pages/callcenter/callcenter.component';
import { WorkorderAddComponent } from 'src/app/pages/workorder-add/workorder-add.component';
import { UserAddComponent } from 'src/app/pages/user-add/user-add.component';
import { EbookComponent } from 'src/app/pages/ebook/ebook.component';
import { LicenseComponent } from 'src/app/pages/license/license.component';
import { NotifComponent } from 'src/app/pages/notif/notif.component';
import { SmsComponent } from 'src/app/pages/sms/sms.component';
import { ChartComponent } from 'src/app/pages/chart/chart.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'workorder',      component: WorkorderComponent },
    { path: 'callcenter',     component: CallcenterComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'workorder-add',  component: WorkorderAddComponent },
    { path: 'user-add',  component: UserAddComponent },
    { path: 'ebook',  component: EbookComponent },
    { path: 'license',  component: LicenseComponent },
    { path: 'notif',  component: NotifComponent },
    { path: 'sms',  component: SmsComponent },
    { path: 'chart',  component: ChartComponent },
];
