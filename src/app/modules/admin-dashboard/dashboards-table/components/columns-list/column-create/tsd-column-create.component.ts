import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TsdDestroyService } from '../../../../../../services/tsd-destroy.service';
import { TsdApiService } from '../../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../../common/loader/services/tsd-loader.service';
import { ApiCreateColumnArguments } from '../../../../../../services/api/tsd-api.models';
import { TsdAdminCommonComponent } from '../../../../shared/tsd-admin-common.component';

@Component({
  selector: 'tsd-column-create',
  templateUrl: './tsd-column-create.component.html',
  styleUrls: ['./tsd-column-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdColumnCreateComponent extends TsdAdminCommonComponent implements OnInit {
  public formCreateTable: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private tsdApiService: TsdApiService,
    private tsdLoaderService: TsdLoaderService,
    private destroy$: TsdDestroyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      this.dashboardName = params['name'];
      this.dashBoardId = params['id'];
      this.tableName = params['tableName'];
      this.tableId = params['tableId'];
    });
  }

  createColumnSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    const createColumnArgs = this.getCreateColumnArgs();

    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .createColumnDashboard(this.tableId, createColumnArgs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tsdLoaderService.loadingEnd();
        this.router.navigate(['tables/columns'], {
          queryParams: {
            name: this.dashboardName,
            id: this.dashBoardId,
            tableId: this.tableId,
            tableName: this.tableName,
          },
        });

      });
  }

  private initForm(): void {
    this.formCreateTable = this.fb.group({
      title: ['', Validators.required],
      typeData: ['', Validators.required],
      typeView: ['', Validators.required],
      maxNormValue: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private getCreateColumnArgs(): ApiCreateColumnArguments {
    return {
      title: this.formCreateTable.get('title')?.value,
      display_type: this.formCreateTable.get('typeView')?.value,
      data_type: this.formCreateTable.get('typeData')?.value,
      value_limit: Number(this.formCreateTable.get('maxNormValue')?.value),
      status: this.formCreateTable.get('status')?.value,
    };
  }
}
