import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TsdApiService } from '../../../services/api/tsd-api.service';
import { TsdTokenService } from '../../../services/tsd-token.service';
import { Router } from '@angular/router';
import { TsdDestroyService } from '../../../services/tsd-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'tsd-admin-header',
  templateUrl: './tsd-admin-header.component.html',
  styleUrls: ['./tsd-admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdAdminHeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(
    private tsdApiService: TsdApiService,
    private tsdTokenService: TsdTokenService,
    private router: Router,
    private destroy$: TsdDestroyService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.tsdTokenService.getTokenFromLocalStorage()) {
      this.isLogged = true;
    }
    this.tsdTokenService.loginSubject.subscribe(
      (res) => {
        this.isLogged = !!res;
        this.cdr.detectChanges();
      },
    );
  }

  logout(): void {
    this.tsdApiService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tsdTokenService.setToken('');
        this.router.navigate(['/login']);
      });
  }
}
