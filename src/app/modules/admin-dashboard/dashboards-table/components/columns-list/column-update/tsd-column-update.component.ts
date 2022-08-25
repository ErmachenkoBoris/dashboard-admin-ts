import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TsdDestroyService } from '../../../../../../services/tsd-destroy.service';
import { TsdApiService } from '../../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../../common/loader/services/tsd-loader.service';
import { ApiCreateColumnArguments, TsdColumnItem } from '../../../../../../services/api/tsd-api.models';
import { TsdAdminCommonComponent } from '../../../../shared/tsd-admin-common.component';

@Component({
  selector: 'tsd-column-update',
  templateUrl: './tsd-column-update.component.html',
  styleUrls: ['./tsd-column-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdColumnUpdateComponent extends TsdAdminCommonComponent implements OnInit {
  public formCreateTable: FormGroup = this.fb.group({});

  public column: TsdColumnItem = {} as TsdColumnItem;

  constructor(
    private fb: FormBuilder,
    private tsdApiService: TsdApiService,
    private tsdLoaderService: TsdLoaderService,
    private destroy$: TsdDestroyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
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
      this.columnName = params['columnName'];
      this.columnId = params['columnId'];

      this.tsdApiService.getColumn(this.columnId, this.tableId).subscribe(column => {
        this.column = column;
        this.initForm();
        this.cdr.detectChanges();
      });
    });
  }

  updateColumnSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    const createColumnArgs = this.getUpdateColumnArgs();

    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .updateColumnDashboard(this.columnId, this.tableId, createColumnArgs)
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
      title: [this.column.title, Validators.required],
      typeData: [this.column.data_type, Validators.required],
      typeView: [this.column.display_type, Validators.required],
      maxNormValue: [this.column.value_limit, Validators.required],
      status: [this.column.status, Validators.required],
    });
  }

  private getUpdateColumnArgs(): ApiCreateColumnArguments {
    return {
      title: this.formCreateTable.get('title')?.value,
      display_type: this.formCreateTable.get('typeView')?.value,
      data_type: this.formCreateTable.get('typeData')?.value,
      value_limit: Number(this.formCreateTable.get('maxNormValue')?.value),
      status: this.formCreateTable.get('status')?.value,
    };
  }
}
