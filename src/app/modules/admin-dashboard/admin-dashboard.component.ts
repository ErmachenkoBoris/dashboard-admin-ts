import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tsd-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
}
