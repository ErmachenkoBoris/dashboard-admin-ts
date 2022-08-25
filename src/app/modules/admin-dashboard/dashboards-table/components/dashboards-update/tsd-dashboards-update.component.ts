import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TsdDestroyService } from '../../../../../services/tsd-destroy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TsdApiService } from '../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../common/loader/services/tsd-loader.service';
import { takeUntil } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import {
  ApiCreateDashboardArguments,
  CRM_PLATFORM_OPTIONS,
  TsdDashboardItem,
} from '../../../../../services/api/tsd-api.models';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TsdAdminCommonComponent } from '../../../shared/tsd-admin-common.component';

@Component({
  selector: 'tsd-dashboards-create',
  templateUrl: './tsd-dashboards-update.component.html',
  styleUrls: ['./tsd-dashboards-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdDashboardsUpdateComponent extends TsdAdminCommonComponent implements OnInit {
  formCreateAcc: FormGroup = this.fb.group({});

  bitrixPicked: boolean = false;

  enums = {
    platform: CRM_PLATFORM_OPTIONS,
  };

  dashboard: TsdDashboardItem = {} as TsdDashboardItem;

  constructor(
    private fb: FormBuilder,
    private tsdApiService: TsdApiService,
    private tsdLoaderService: TsdLoaderService,
    private destroy$: TsdDestroyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.dashboardName = params['name'];
      this.dashBoardId = params['id'];
      this.loadDashboard();
    });
  }

  updateDashboardSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    const updateDashboardArguments = this.getUpdateDashboardArguments();

    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .updateDashboard(this.dashBoardId, updateDashboardArguments)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tsdLoaderService.loadingEnd();
        this.router.navigate(['/']);
      });
  }

  private initForm(): void {
    this.formCreateAcc = this.fb.group({
      subDomain: [this.dashboard.subdomain, Validators.required],
      platform: [this.dashboard.platform_crm, Validators.required],
      clientId: [this.dashboard.client_id, Validators.required],
      secretKey: [this.dashboard.client_secret, Validators.required],
      webhook: [this.dashboard.webhook, Validators.required],
      status: [this.dashboard.status, Validators.required],
    });

    if (this.dashboard.platform_crm === CRM_PLATFORM_OPTIONS.amo) {
      this.formCreateAcc.get('webhook')?.removeValidators(Validators.required);
    }

    if (this.dashboard.platform_crm === CRM_PLATFORM_OPTIONS.bitrix24) {
      this.bitrixPicked = true;
      this.formCreateAcc.get('clientId')?.removeValidators(Validators.required);
      this.formCreateAcc.get('secretKey')?.removeValidators(Validators.required);
    }
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

  private getUpdateDashboardArguments(): ApiCreateDashboardArguments {
    return {
      subdomain: this.formCreateAcc.get('subDomain')?.value,
      platform_crm: this.formCreateAcc.get('platform')?.value,
      client_id: this.formCreateAcc.get('clientId')?.value,
      client_secret: this.formCreateAcc.get('secretKey')?.value,
      webhook: this.formCreateAcc.get('webhook')?.value,
      status: this.formCreateAcc.get('status')?.value,
    };
  }

  private loadDashboard(): void {
    this.tsdApiService.getDashboard(this.dashBoardId).pipe(takeUntil(this.destroy$)).subscribe(dashboard => {
      this.dashboard = dashboard;
      this.initForm();
      this.cdr.detectChanges();
    });
  }
}
