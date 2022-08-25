import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TsdTokenService } from '../tsd-token.service';

@Injectable({
  providedIn: 'root',
})
export class TsdAuthGuard implements CanActivate {
  constructor(private tsdTokenService: TsdTokenService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tsdTokenService.getTokenFromLocalStorage()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
