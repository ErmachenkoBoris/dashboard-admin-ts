import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TsdDestroyService } from '../../../../../services/tsd-destroy.service';
import { COLUMNS_TABLE_COLUMNS } from './tsd-column-list.consts';
import { TsdApiService } from '../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../common/loader/services/tsd-loader.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DELETE_POPUP } from '../../tsd-dashboards-list.consts';
import { TsdPopupService } from '../../../../common/popup/services/tsd-popup.service';
import { TsdColumnItem } from '../../../../../services/api/tsd-api.models';
import { TsdAdminCommonComponent } from '../../../shared/tsd-admin-common.component';

@Component({
  selector: 'tsd-dashboards-table-columns',
  templateUrl: './tsd-column-list.component.html',
  styleUrls: ['./tsd-column-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdColumnListComponent extends TsdAdminCommonComponent implements OnInit {
  displayedTableColumns: string[] = COLUMNS_TABLE_COLUMNS;

  dataColumnSource!: MatTableDataSource<TsdColumnItem>;

  @ViewChild(MatPaginator)
    paginator!: MatPaginator;

  constructor(
    private tsdApiService: TsdApiService,
    private destroy$: TsdDestroyService,
    private tsdLoaderService: TsdLoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private tsdPopupService: TsdPopupService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.dashboardName = params['name'];
        this.dashBoardId = params['id'];
        this.tableName = params['tableName'];
        this.tableId = params['tableId'];

        this.loadColumnsForTable();
      });
  }

  addNewColumn(): void {
    this.router.navigate(['tables/columns/column-create'], {
      queryParams: {
        name: this.dashboardName,
        id: this.dashBoardId,
        tableId: this.tableId,
        tableName: this.tableName,
      },
    });
  }

  deleteColumn(element: TsdColumnItem): void {
    this.tsdPopupService
      .open({
        title: DELETE_POPUP.title + ' ' + element.title,
        cancelText: DELETE_POPUP.cancelText,
        confirmText: DELETE_POPUP.confirmText,
        message: DELETE_POPUP.message,
      })
      .subscribe((res) => {
        if (res) {
          this.tsdLoaderService.loadingStart();
          this.tsdApiService
            .deleteColumnTable(element, this.tableId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {

              this.tsdLoaderService.loadingEnd();
              this.loadColumnsForTable();
            });
        }
      });
  }

  private loadColumnsForTable(): void {
    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .getTablesColumns(this.tableId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((columns) => {
        this.tsdLoaderService.loadingEnd();
        this.dataColumnSource = new MatTableDataSource<TsdColumnItem>(columns);
        this.dataColumnSource.paginator = this.paginator;
      });
  }

  updateColumn(element: TsdColumnItem): void {
    this.router.navigate(['tables/columns/column-update'], {
      queryParams: {
        name: this.dashboardName,
        id: this.dashBoardId,
        tableId: this.tableId,
        tableName: this.tableName,
        columnId: element.id,
        columnName: element.title,
      },
    });
  }
}
