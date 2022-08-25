import { NgModule } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
  },
];

@NgModule({
  declarations: [UserDashboardComponent],
  exports: [UserDashboardComponent],
  imports: [RouterModule.forChild(routes)],
})
export class UserDashboardModule {}
