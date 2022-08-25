import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tsd-popup',
  templateUrl: './tsd-popup.component.html',
  styleUrls: ['./tsd-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
    },
    private mdDialogRef: MatDialogRef<TsdPopupComponent>,
  ) {}

  public cancel(): void {
    this.close(false);
  }

  public close(value: boolean): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }
}
