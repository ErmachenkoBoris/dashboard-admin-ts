import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { TsdDestroyService } from '../../../../../../services/tsd-destroy.service';
import {
  ApiCreateTableArguments,
  TsdTableItem,
} from '../../../../../../services/api/tsd-api.models';
import { TsdApiService } from '../../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../../common/loader/services/tsd-loader.service';
import { TsdAdminCommonComponent } from '../../../../shared/tsd-admin-common.component';
import { ADD_ON_BLUR, addUserChips, deleteUserChips, SEPARATOR_CODES } from '../utils/tsd-table.utils';

@Component({
  selector: 'tsd-table-update',
  templateUrl: './tsd-table-update.component.html',
  styleUrls: ['./tsd-table-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdTableUpdateComponent extends TsdAdminCommonComponent implements OnInit {
  readonly separatorKeysCodes = SEPARATOR_CODES;

  public formCreateTable: FormGroup = this.fb.group({});

  public addOnBlur: boolean = ADD_ON_BLUR;

  public tableItem: TsdTableItem = {} as TsdTableItem;

  public userList: string[] = [];

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
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.dashboardName = params['name'];
        this.dashBoardId = params['id'];
        this.tableName = params['tableName'];
        this.tableId = params['tableId'];

        this.loadTable();
      });
  }

  updateTableSubmit(): void {
    const updateTableArgs = this.getUpdateTableArgs();

    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .updateTableDashboard(this.dashBoardId, this.tableId, updateTableArgs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tsdLoaderService.loadingEnd();

        this.router.navigate(['tables'], {
          queryParams: { name: this.dashboardName, id: this.dashBoardId },
        });
      });
  }

  private initForm(): void {
    this.formCreateTable = this.fb.group({
      title: [this.tableItem.title || ''],
      status: [this.tableItem.status],
    });
  }

  private getUpdateTableArgs(): ApiCreateTableArguments {
    return {
      title: this.formCreateTable.get('title')?.value,
      people: this.userList.join(','),
      status: this.formCreateTable.get('status')?.value,
    };
  }

  private loadTable(): void {
    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .getTable(this.dashBoardId, this.tableId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((table) => {
        this.tsdLoaderService.loadingEnd();
        this.tableItem = table;
        this.userList = table.people.split(',');
        this.initForm();
        this.cdr.detectChanges();
      });
  }

  removeUser(user: string): void {
    this.userList = deleteUserChips(user, this.userList);
    this.cdr.detectChanges();
  }

  addUser($event: MatChipInputEvent): void {
    addUserChips($event, this.userList);
  }
}
