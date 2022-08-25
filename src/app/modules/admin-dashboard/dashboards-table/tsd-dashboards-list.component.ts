import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TsdApiService } from '../../../services/api/tsd-api.service';
import { TsdDestroyService } from '../../../services/tsd-destroy.service';
import { takeUntil } from 'rxjs';
import { TsdLoaderService } from '../../common/loader/services/tsd-loader.service';
import {
  DASHBOARD_TABLE_COLUMNS,
  DELETE_POPUP,
} from './tsd-dashboards-list.consts';
import { Router } from '@angular/router';
import { TsdPopupService } from '../../common/popup/services/tsd-popup.service';
import { TsdDashboardItem } from '../../../services/api/tsd-api.models';

@Component({
  selector: 'tsd-dashboards-table',
  templateUrl: './tsd-dashboards-list.component.html',
  styleUrls: ['./tsd-dashboards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdDashboardsListComponent implements OnInit {
  displayedColumns: string[] = DASHBOARD_TABLE_COLUMNS;

  dataSource!: MatTableDataSource<TsdDashboardItem>;

  originData!: TsdDashboardItem[];

  @ViewChild(MatPaginator)
    paginator!: MatPaginator;

  filterSubDomain: string = '';

  filterDomain: string = '';

  filterStatus: string = '';

  constructor(
    private tsdApiService: TsdApiService,
    private destroy$: TsdDestroyService,
    private tsdLoaderService: TsdLoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private tsdPopupService: TsdPopupService,
  ) {}

  addNewAccount(): void {
    this.router.navigate(['create']);
  }

  ngOnInit(): void {
    this.loadDashboards();
  }

  public applyFilters(): void {
    const tmpData = this.originData.filter(
      (value) =>
        value.platform_crm.startsWith(this.filterDomain) &&
        value.subdomain.startsWith(this.filterSubDomain) &&
        value.status.toString().startsWith(this.filterStatus),
    );
    this.dataSource = new MatTableDataSource<TsdDashboardItem>(tmpData);
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  goToAccountTables(element: TsdDashboardItem): void {
    this.router.navigate(['tables'], {
      queryParams: { name: element.subdomain, id: element.id },
    });
  }

  deleteAccount(element: TsdDashboardItem): void {
    this.tsdPopupService
      .open({
        title: DELETE_POPUP.title + ' ' + element.subdomain,
        cancelText: DELETE_POPUP.cancelText,
        confirmText: DELETE_POPUP.confirmText,
        message: DELETE_POPUP.message,
      })
      .subscribe((res) => {
        if (res) {
          this.tsdLoaderService.loadingStart();
          this.tsdApiService
            .deleteDashboard(element)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.tsdLoaderService.loadingEnd();
              this.loadDashboards();
            });
        }
      });
  }

  private loadDashboards(): void {
    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .getDashboards()
      .pipe(takeUntil(this.destroy$))
      .subscribe((table) => {
        this.tsdLoaderService.loadingEnd();
        this.originData = table;
        this.dataSource = new MatTableDataSource<TsdDashboardItem>(table);
        this.dataSource.paginator = this.paginator;
      });
  }

  updateAccount(element: TsdDashboardItem): void {
    this.router.navigate(['update'], {
      queryParams: {
        id: element.id,
        name: element.subdomain,
      },
    });
  }
}
