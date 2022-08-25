import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TsdLoaderService } from './services/tsd-loader.service';

@Component({
  selector: 'tsd-loader',
  templateUrl: './tsd-loader.component.html',
  styleUrls: ['./tsd-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdLoaderComponent {
  public loading$: Observable<boolean> = this.tsdLoaderService.getLoading();

  public close = false;

  constructor(private tsdLoaderService: TsdLoaderService) {}
}
