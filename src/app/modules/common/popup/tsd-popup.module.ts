import { NgModule } from '@angular/core';
import { TsdPopupComponent } from './tsd-popup.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TsdPopupService } from './services/tsd-popup.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TsdPopupComponent],
  exports: [TsdPopupComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  providers: [TsdPopupService],
})
export class TsdPopupModule {}
