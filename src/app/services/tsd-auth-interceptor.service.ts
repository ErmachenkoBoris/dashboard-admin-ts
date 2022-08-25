import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TsdAlertService } from '../modules/common/alert/services/tsd-alert.service';
import { TsdTokenService } from './tsd-token.service';
import { Router } from '@angular/router';
import { TsdLoaderService } from '../modules/common/loader/services/tsd-loader.service';

@Injectable({
  providedIn: 'root',
})
export class TsdAuthInterceptorService implements HttpInterceptor {
  constructor(
    private tsdAlertService: TsdAlertService,
    private tsdTokenService: TsdTokenService,
    private router: Router,
    private tsdLoaderService: TsdLoaderService,
  ) {}

  intercept(
    req: HttpRequest<never>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let customReq = req.clone();

    const token = this.tsdTokenService.getTokenFromLocalStorage();
    if (token) {
      customReq = customReq.clone({
        headers: customReq.headers.set('Authorization', token),
      });
    }

    return next.handle(customReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            //TODO add handler
          }
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            this.tsdLoaderService.loadingEnd();
            this.tsdAlertService.setAlert(err.error?.message ? JSON.stringify(err.error?.message) : err.message);
            if (err.status == 401) {
              this.router.navigate(['/login']);
              this.tsdAlertService.setAlert('Unauthorized ' + err.error?.error);
              this.tsdTokenService.setToken('');
            }
          }
        },
      }),
    );
  }
}
