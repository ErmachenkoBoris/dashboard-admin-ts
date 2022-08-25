import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsdDashboardsListComponent } from './tsd-dashboards-list.component';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TsdAuthGuard } from '../../../services/guard/tsd-auth-guard.service';
import { TsdDashboardsCreateComponent } from './components/dashboards-create/tsd-dashboards-create.component';
import { TsdTableListComponent } from './components/table-list/tsd-table-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { TsdColumnListComponent } from './components/columns-list/tsd-column-list.component';
import { TsdColumnCreateComponent } from './components/columns-list/column-create/tsd-column-create.component';
import { TsdColumnUpdateComponent } from './components/columns-list/column-update/tsd-column-update.component';
import { TsdTableCreateComponent } from './components/table-list/table-create/tsd-table-create.component';
import { TsdTableUpdateComponent } from './components/table-list/table-update/tsd-table-update.component';
import { TsdDashboardsUpdateComponent } from './components/dashboards-update/tsd-dashboards-update.component';

const routes: Routes = [
  {
    path: '',
    component: TsdDashboardsListComponent,
    pathMatch: 'full',
    canActivate: [TsdAuthGuard],
  },
  {
    path: 'create',
    component: TsdDashboardsCreateComponent,
    canActivate: [TsdAuthGuard],
  },
  {
    path: 'update',
    component: TsdDashboardsUpdateComponent,
    canActivate: [TsdAuthGuard],
  },
  {
    path: 'tables',
    component: TsdTableListComponent,
    canActivate: [TsdAuthGuard],
  },
  {
    path: 'tables/table-create',
    component: TsdTableCreateComponent,
    canActivate: [TsdAuthGuard],
  },
  {
    path: 'tables/table-update',
    component: TsdTableUpdateComponent,
  },
  {
    path: 'tables/columns',
    component: TsdColumnListComponent,
  },
  {
    path: 'tables/columns/column-create',
    component: TsdColumnCreateComponent,
    canActivate: [TsdAuthGuard],
  },
  {
    path: 'tables/columns/column-update',
    component: TsdColumnUpdateComponent,
  },
];

@NgModule({
  declarations: [
    TsdDashboardsListComponent,
    TsdDashboardsCreateComponent,
    TsdTableListComponent,
    TsdTableCreateComponent,
    TsdTableUpdateComponent,
    TsdColumnUpdateComponent,
    TsdColumnCreateComponent,
    TsdColumnListComponent,
    TsdDashboardsUpdateComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  exports: [TsdDashboardsListComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' },
    },
  ],
})
export class TsdDashboardsListModule {}
