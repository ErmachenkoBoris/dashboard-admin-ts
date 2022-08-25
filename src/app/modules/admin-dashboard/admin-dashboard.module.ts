import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TsdAdminHeaderModule } from './admin-header/tsd-admin-header.module';
import { TsdAdminNavigationModule } from './navigation/tsd-admin-navigation.module';
import { TsdAdminCommonComponent } from './shared/tsd-admin-common.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            './dashboards-table/tsd-dashboards-list.module'
          ).then((m) => m.TsdDashboardsListModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import(
            '../admin-dashboard/authorization/tsd-authorization.module'
          ).then((m) => m.TsdAuthorizationModule),
      },
    ],
  },
];

@NgModule({
  declarations: [AdminDashboardComponent, TsdAdminCommonComponent],
  exports: [AdminDashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    TsdAdminHeaderModule,
    TsdAdminNavigationModule,
  ],
})
export class AdminDashboardModule {}
