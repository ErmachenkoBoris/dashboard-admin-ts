import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TsdApiService } from '../../../services/api/tsd-api.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TsdDestroyService } from '../../../services/tsd-destroy.service';

@Component({
  selector: 'tsd-authorization',
  templateUrl: './tsd-authorization.component.html',
  styleUrls: ['./tsd-authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdAuthorizationComponent implements OnInit {
  public hide: boolean = true;

  public formAuth: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private tsdApiService: TsdApiService,
    private router: Router,
    private destroy$: TsdDestroyService,
  ) {}

  ngOnInit(): void {
    this.formAuth = this.fb.group({
      password: ['', Validators.required],
      login: ['', Validators.required],
    });
  }

  tryLogin($event: SubmitEvent): void {
    $event.preventDefault();

    this.tsdApiService
      .requestLogin(
        this.formAuth.controls['login'].value,
        this.formAuth.controls['password'].value,
      ).pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.navigateToMainAdminPage();
        }
      });
  }

  private navigateToMainAdminPage(): void {
    this.router.navigate(['']);
  }
}
