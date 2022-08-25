import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TsdAlertService } from './services/tsd-alert.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'tsd-alert',
  templateUrl: './tsd-alert.component.html',
  styleUrls: ['./tsd-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsdAlertComponent implements OnInit {
  public alertMessage$: Observable<string> = this.tsdAlertService.getAlert();

  public close = false;

  constructor(private tsdAlertService: TsdAlertService) {}

  ngOnInit(): void {
    this.alertMessage$ = this.tsdAlertService.getAlert().pipe(
      tap(() => {
        this.close = false;
      }),
    );
  }

  closeAlert(): void {
    this.close = true;
  }
}
