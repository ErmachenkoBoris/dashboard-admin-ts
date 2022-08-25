import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


const TOKEN_KEY = 'secure-jwt-token';

@Injectable({ providedIn: 'root' })
export class TsdTokenService {

  public loginSubject = new Subject();

  public getTokenFromLocalStorage(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  public setToken(token: string): void {

    this.loginSubject.next(token);

    localStorage.setItem(TOKEN_KEY, token);
  }
}
