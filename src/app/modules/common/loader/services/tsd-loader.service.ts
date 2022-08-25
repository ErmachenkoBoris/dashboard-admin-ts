import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TsdLoaderService implements OnDestroy {
  private loading$ = new Subject<boolean>();

  public getLoading(): Observable<boolean> {
    return this.loading$;
  }

  public loadingStart(): void {
    this.loading$.next(true);
  }

  public loadingEnd(): void {
    this.loading$.next(false);
  }

  ngOnDestroy(): void {
    this.loading$.complete();
  }
}
