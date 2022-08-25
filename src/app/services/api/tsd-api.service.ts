import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TsdTokenService } from '../tsd-token.service';
import {
  ApiCreateColumnArguments,
  ApiCreateDashboardArguments,
  ApiCreateTableArguments, TsdColumnItem,
  TsdDashboardItem,
  TsdTableItem,
} from './tsd-api.models';

@Injectable({ providedIn: 'root' })
export class TsdApiService {
  constructor(
    private http: HttpClient,
    private tsdTokenService: TsdTokenService,
  ) {}

  public requestLogin(login: string, password: string): Observable<boolean> {
    return this.http
      .post(
        '/api/sign_in',
        {
          user: {
            email: login,
            password: password,
          },
        },
        { observe: 'response' },
      )
      .pipe(
        map((res) => {
          const bearer = res.headers.get('Authorization');
          if (bearer) {
            this.tsdTokenService.setToken(bearer);
            return true;
          }
          return false;
        }),
      );
  }

  // DASHBOARDS

  public getDashboards(): Observable<TsdDashboardItem[]> {
    return this.http
      .get('/api/admin/dashboards')
      .pipe(map((res) => res as TsdDashboardItem[]));
  }

  public createDashboard(
    argsValues: ApiCreateDashboardArguments,
  ): Observable<TsdDashboardItem> {
    return this.http
      .post('/api/admin/dashboards', { ...argsValues })
      .pipe(map((res) => res as TsdDashboardItem));
  }

  public deleteDashboard(element: TsdDashboardItem): Observable<unknown> {
    return this.http.delete(`api/admin/dashboards/${element.id}`);
  }

  public updateDashboard(dashBoardId: string, updateDashboardArgs: ApiCreateDashboardArguments): Observable<unknown> {
    return this.http
      .put(
        `/api/admin/dashboards/${dashBoardId}`,
        { ...updateDashboardArgs });
  }

  public getDashboard(id: string): Observable<TsdDashboardItem> {
    return this.http
      .get(`/api/admin/dashboards/${id}`)
      .pipe(map((res) => res as TsdDashboardItem));
  }


  // TABLES

  public getDashboardTables(id: string): Observable<TsdTableItem[]> {
    return this.http
      .get('/api/admin/tables', { params: { dashboard_id: id } })
      .pipe(map((res) => res as TsdTableItem[]));
  }

  public createTableDashboard(
    dashBoardId: string,
    createTableArgs: ApiCreateTableArguments,
  ): Observable<TsdTableItem> {
    return this.http
      .post(
        '/api/admin/tables',
        { ...createTableArgs },
        { params: { dashboard_id: dashBoardId } },
      )
      .pipe(map((res) => res as TsdTableItem));
  }

  public updateTableDashboard(dashBoardId: string, tableId: string, updateTableArgs: ApiCreateTableArguments): Observable<unknown> {
    return this.http
      .put(
        `/api/admin/tables/${tableId}`,
        { ...updateTableArgs },
        { params: { dashboard_id: dashBoardId } },
      );
  }

  public deleteTableDashboard(
    element: TsdTableItem,
    dashboard_id: string,
  ): Observable<unknown> {
    return this.http.delete(`/api/admin/tables/${element.id}`, {
      params: { dashboard_id: dashboard_id },
    });
  }

  public getTable(id: string, tableId: string): Observable<TsdTableItem> {
    return this.http
      .get(`/api/admin/tables/${tableId}`, { params: { dashboard_id: id } })
      .pipe(map((res) => res as TsdTableItem));
  }


  //COLUMNS

  public createColumnDashboard(
    tableId: string,
    createColumnArgs: ApiCreateColumnArguments,
  ): Observable<TsdTableItem> {
    return this.http
      .post(
        '/api/admin/table_columns',
        { ...createColumnArgs },
        { params: { table_id: tableId } },
      )
      .pipe(map((res) => res as TsdTableItem));
  }

  public updateColumnDashboard(
    columnId: string,
    tableId: string,
    updateColumnArgs: ApiCreateColumnArguments,
  ): Observable<TsdTableItem> {
    return this.http
      .put(
        `/api/admin/table_columns/${columnId}`,
        { ...updateColumnArgs },
        { params: { table_id: tableId } },
      )
      .pipe(map((res) => res as TsdTableItem));
  }

  public deleteColumnTable(
    element: TsdColumnItem,
    tableId: string,
  ): Observable<unknown> {
    return this.http.delete(`/api/admin/table_columns/${element.id}`, {
      params: { table_id: tableId },
    });
  }

  public getTablesColumns(tableId: string): Observable<TsdColumnItem[]> {
    return this.http
      .get('/api/admin/table_columns', { params: { table_id: tableId } })
      .pipe(map((res) => res as TsdColumnItem[]));
  }

  public getColumn(columnId: string, tableId: string): Observable<TsdColumnItem> {
    return this.http
      .get(`/api/admin/table_columns/${columnId}`, { params: { table_id: tableId } })
      .pipe(map((res) => res as TsdColumnItem));
  }

  public logout(): Observable<unknown> {
    return this.http.delete('/api/sign_out');
  }

  private createAuthorizationHeader(
    username: string,
    password: string,
  ): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.set('login', 'true');

    headers = headers.set(
      'Authorization',
      'Basic ' + btoa(`${username}:${password}`),
    );

    return headers;
  }
}
