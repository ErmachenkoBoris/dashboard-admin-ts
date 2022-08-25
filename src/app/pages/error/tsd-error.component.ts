import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tsd-error',
  templateUrl: './tsd-error.component.html',
  styleUrls: ['./tsd-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdErrorComponent {
}
