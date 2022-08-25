import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsdAdminHeaderComponent } from './tsd-admin-header.component';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TsdAdminHeaderComponent],
  imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  exports: [TsdAdminHeaderComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' },
    },
  ],
})
export class TsdAdminHeaderModule {}
