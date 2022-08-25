import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tsd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'tony-start-dashboard';
}
