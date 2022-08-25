import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TsdErrorComponent } from './pages/error/tsd-error.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule,
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule,
      ),
  },
  { path: '**', component: TsdErrorComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
