import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TsdAlertService implements OnDestroy {
  private alert$ = new BehaviorSubject<string>('');

  public getAlert(): Observable<string> {
    return this.alert$;
  }

  public setAlert(message: string): void {
    this.alert$.next(message);
  }

  ngOnDestroy(): void {
    this.alert$.complete();
  }
}
