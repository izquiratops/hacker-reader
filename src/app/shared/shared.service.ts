import { Injectable } from '@angular/core';
import { BehaviorSubject, scan, shareReplay, startWith, Subject } from 'rxjs';

import { Item, Theme, TYPES } from './hn.model';

@Injectable()
export class SharedService {
  readonly WIDTH_THRESHOLD_PX = 760;

  // Feed context
  feedIds: number[] = [];
  feedStories = new BehaviorSubject<Item[]>([]);
  feedType = TYPES[0];
  feedScrollPosition = 0;
  feedPage = -1;

  // Last story checked
  lastItem: Item = null;

  // App state
  switchDark$ = new Subject<null>();
  isDark$ = this.switchDark$.asObservable().pipe(
    // startWith is setted with the oposite 'value' because the scan will get the '!value'
    startWith((localStorage.getItem('theme') ?? Theme.LIGHT) == Theme.DARK),
    scan((acc, curr) => !acc),
    shareReplay(1)
  );
  isMobile$ = new BehaviorSubject(window.innerWidth < this.WIDTH_THRESHOLD_PX);
}
