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
import { TABLE_COLUMNS } from './tsd-table-list.consts';
import { TsdApiService } from '../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../common/loader/services/tsd-loader.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DELETE_POPUP } from '../../tsd-dashboards-list.consts';
import { TsdPopupService } from '../../../../common/popup/services/tsd-popup.service';
import { TsdTableItem } from '../../../../../services/api/tsd-api.models';
import { TsdAdminCommonComponent } from '../../../shared/tsd-admin-common.component';

@Component({
  selector: 'tsd-dashboards-table',
  templateUrl: './tsd-table-list.component.html',
  styleUrls: ['./tsd-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdTableListComponent extends TsdAdminCommonComponent implements OnInit {
  displayedTableColumns: string[] = TABLE_COLUMNS;

  dataTablesSource!: MatTableDataSource<TsdTableItem>;

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

        this.loadTablesForDashboard();
      });
  }

  addNewTable(): void {
    this.router.navigate(['tables/table-create'], {
      queryParams: { name: this.dashboardName, id: this.dashBoardId },
    });
  }

  deleteTable(element: TsdTableItem): void {
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
            .deleteTableDashboard(element, this.dashBoardId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.tsdLoaderService.loadingEnd();
              this.loadTablesForDashboard();
            });
        }
      });
  }

  private loadTablesForDashboard(): void {
    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .getDashboardTables(this.dashBoardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((table) => {
        this.tsdLoaderService.loadingEnd();
        this.dataTablesSource = new MatTableDataSource<TsdTableItem>(table);
        this.dataTablesSource.paginator = this.paginator;
      });
  }

  updateTable(element: TsdTableItem): void {
    this.router.navigate(['tables/table-update'], {
      queryParams: {
        name: this.dashboardName,
        id: this.dashBoardId,
        tableId: element.id,
        tableName: element.title,
      },
    });
  }

  openColumns(element: TsdTableItem): void {
    this.router.navigate(['tables/columns'], {
      queryParams: {
        name: this.dashboardName,
        id: this.dashBoardId,
        tableId: element.id,
        tableName: element.title,
      },
    });
  }
}
