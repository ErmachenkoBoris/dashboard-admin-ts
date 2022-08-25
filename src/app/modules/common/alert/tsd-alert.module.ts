import { NgModule } from '@angular/core';
import { TsdAlertComponent } from './tsd-alert.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TsdAlertComponent],
  exports: [TsdAlertComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class TsdAlertModule {}
