import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TsdDestroyService } from '../../../../../services/tsd-destroy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TsdApiService } from '../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../common/loader/services/tsd-loader.service';
import { takeUntil } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ApiCreateDashboardArguments, CRM_PLATFORM_OPTIONS } from '../../../../../services/api/tsd-api.models';
import { Router } from '@angular/router';

@Component({
  selector: 'tsd-dashboards-create',
  templateUrl: './tsd-dashboards-create.component.html',
  styleUrls: ['./tsd-dashboards-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdDashboardsCreateComponent implements OnInit {
  formCreateAcc: FormGroup = this.fb.group({});

  bitrixPicked: boolean = false;

  enums = {
    platform: CRM_PLATFORM_OPTIONS,
  };

  constructor(
    private fb: FormBuilder,
    private tsdApiService: TsdApiService,
    private tsdLoaderService: TsdLoaderService,
    private destroy$: TsdDestroyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  createAccSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    const createAccArguments = this.getCreateAccArguments();

    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .createDashboard(createAccArguments)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tsdLoaderService.loadingEnd();
        this.router.navigate(['/']);
      });
  }

  private initForm(): void {
    this.formCreateAcc = this.fb.group({
      subDomain: ['', Validators.required],
      platform: ['', Validators.required],
      clientId: ['', Validators.required],
      secretKey: ['', Validators.required],
      webhook: [''],
      status: ['', Validators.required],
    });
  }

  platformSelect($event: MatSelectChange): void {
    if ($event.value === this.enums.platform.bitrix24) {
      this.formCreateAcc.get('webhook')?.addValidators(Validators.required);

      this.formCreateAcc.get('clientId')?.removeValidators(Validators.required);
      this.formCreateAcc.get('clientId')?.setValue(null);

      this.formCreateAcc.get('secretKey')?.removeValidators(Validators.required);
      this.formCreateAcc.get('secretKey')?.setValue(null);

      this.bitrixPicked = true;
      return;
    }
    this.formCreateAcc.get('webhook')?.setValue(null);
    this.formCreateAcc.get('webhook')?.removeValidators(Validators.required);
    this.bitrixPicked = false;
    return;
  }

  private getCreateAccArguments(): ApiCreateDashboardArguments {
    return {
      subdomain: this.formCreateAcc.get('subDomain')?.value,
      platform_crm: this.formCreateAcc.get('platform')?.value,
      client_id: this.formCreateAcc.get('clientId')?.value,
      client_secret: this.formCreateAcc.get('secretKey')?.value,
      webhook: this.formCreateAcc.get('webhook')?.value,
      status: this.formCreateAcc.get('status')?.value,
    };
  }
}
