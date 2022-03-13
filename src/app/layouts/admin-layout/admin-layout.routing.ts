import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { WorkorderComponent } from 'src/app/pages/workorder/workorder.component';
import { CallcenterComponent } from 'src/app/pages/callcenter/callcenter.component';
import { WorkorderAddComponent } from 'src/app/pages/workorder-add/workorder-add.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'workorder',      component: WorkorderComponent },
    { path: 'callcenter',      component: CallcenterComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'workorder-add',           component: WorkorderAddComponent },
];
