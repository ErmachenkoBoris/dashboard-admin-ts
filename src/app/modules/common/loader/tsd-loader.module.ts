import { NgModule } from '@angular/core';
import { TsdLoaderComponent } from './tsd-loader.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [TsdLoaderComponent],
  exports: [TsdLoaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class TsdLoaderModule {}
