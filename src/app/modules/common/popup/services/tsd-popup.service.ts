import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TsdPopupComponent } from '../tsd-popup.component';
import { map, Observable, take } from 'rxjs';

@Injectable()
export class TsdPopupService {
  constructor(private dialog: MatDialog) {}

  dialogRef!: MatDialogRef<TsdPopupComponent>;

  public open(options: {
    title: string;
    message: string;
    cancelText: string;
    confirmText: string;
    // eslint-disable-next-line
  }): Observable<any>  {
    this.dialogRef = this.dialog.open(TsdPopupComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });

    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      }),
    );
  }
}
