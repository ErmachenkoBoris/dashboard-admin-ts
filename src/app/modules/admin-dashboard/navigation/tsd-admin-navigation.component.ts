import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, takeUntil } from 'rxjs';
import { TsdDestroyService } from '../../../services/tsd-destroy.service';

@Component({
  selector: 'tsd-admin-navigation',
  templateUrl: './tsd-admin-navigation.component.html',
  styleUrls: ['./tsd-admin-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TsdDestroyService],
})
export class TsdAdminNavigationComponent implements OnInit {
  constructor(private router: Router, private destroy$: TsdDestroyService, private cdr: ChangeDetectorRef) {}

  routerTree: string[] = [];

  lastQueryParams: string = '';

  public routerQueryParamMap = new Map();

  ngOnInit(): void {
    this.buildTreeUrls(this.router.url);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event) => {
        if (event instanceof RouterEvent) {
          this.buildTreeUrls(event.url);
        }
      });
  }

  buildTreeUrls(url: string): void {
    this.routerTree = this.router.url === '/' ? [] : url.split('?');
    if (this.routerTree.length > 1) {
      this.routerQueryParamMap.set(this.routerTree[0], this.routerTree[1]);
      this.lastQueryParams = this.routerTree[1];
    }
    if (this.routerTree.length) {
      this.routerTree = this.routerTree[0].split('/');
    }

    if (this.routerTree.length) {
      this.routerTree[0] = 'main';
    }
    if (this.routerTree.length && this.routerTree[1] === 'login') {
      this.routerTree = [];
    }
    this.cdr.detectChanges();
  }

  navigateToPath(routeIndex: number): void {
    let path = this.routerTree
      .filter((value, index) => index > 0 && index <= routeIndex)
      .join('/');
    const query = this.routerQueryParamMap.get('/' + path);

    if (query || !!this.lastQueryParams && !!path) {
      const tmpQuery = !!query ? query : this.lastQueryParams;
      path += '?' + tmpQuery;
    }
    window.location.href = path;
  }
}
