import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TsdDestroyService } from '../../../../../../services/tsd-destroy.service';
import { TsdApiService } from '../../../../../../services/api/tsd-api.service';
import { TsdLoaderService } from '../../../../../common/loader/services/tsd-loader.service';
import { ApiCreateTableArguments } from '../../../../../../services/api/tsd-api.models';
import { MatChipInputEvent } from '@angular/material/chips';
import { TsdAdminCommonComponent } from '../../../../shared/tsd-admin-common.component';
import { ADD_ON_BLUR, addUserChips, deleteUserChips, SEPARATOR_CODES } from '../utils/tsd-table.utils';

@Component({
  selector: 'tsd-table-create',
  templateUrl: './tsd-table-create.component.html',
  styleUrls: ['./tsd-table-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdTableCreateComponent extends TsdAdminCommonComponent implements OnInit {
  public formCreateTable: FormGroup = this.fb.group({});

  public userList: string[] = [];

  public addOnBlur: boolean = ADD_ON_BLUR;

  readonly separatorKeysCodes = SEPARATOR_CODES;

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
    });
  }

  createTableSubmit($event: SubmitEvent): void {
    $event.preventDefault();

    const createTableArgs = this.getCreateTableArgs();

    this.tsdLoaderService.loadingStart();
    this.tsdApiService
      .createTableDashboard(this.dashBoardId, createTableArgs)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.tsdLoaderService.loadingEnd();
        this.router.navigate(['tables'], { queryParams: { name: this.dashboardName, id: this.dashBoardId } });
      });
  }

  private initForm(): void {
    this.formCreateTable = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private getCreateTableArgs(): ApiCreateTableArguments {
    return {
      title: this.formCreateTable.get('title')?.value,
      people: this.userList.join(','),
      status: this.formCreateTable.get('status')?.value,
    };
  }

  addUser($event: MatChipInputEvent): void {
    addUserChips($event, this.userList);
  }

  removeUser(user: string): void {
    this.userList = deleteUserChips(user, this.userList);
    this.cdr.detectChanges();
  }

}
