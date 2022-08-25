import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TsdDestroyService } from '../../../services/tsd-destroy.service';

@Component({
  selector: 'tsd-admin-common',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
  template: '',
})
export class TsdAdminCommonComponent {

  public dashboardName: string = '';

  public dashBoardId: string = '';

  public tableName: string = '';

  public tableId: string = '';

  public columnName: string = '';

  public columnId: string = '';
}
