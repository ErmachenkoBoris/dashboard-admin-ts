import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tsd-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent {}
