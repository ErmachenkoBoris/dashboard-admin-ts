import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsdAuthorizationComponent } from './tsd-authorization.component';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TsdAuthorizationComponent,
  }];

@NgModule({
  declarations: [TsdAuthorizationComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
  ],
  exports: [TsdAuthorizationComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' },
    },
  ],
})
export class TsdAuthorizationModule {}
