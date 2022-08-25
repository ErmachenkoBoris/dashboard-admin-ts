import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsdAdminNavigationComponent } from './tsd-admin-navigation.component';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TsdAdminNavigationComponent],
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  exports: [TsdAdminNavigationComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' },
    },
  ],
})
export class TsdAdminNavigationModule {}
