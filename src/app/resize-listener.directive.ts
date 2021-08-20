import { Directive, OnInit } from '@angular/core';
import { fromEvent, throttleTime, pluck } from 'rxjs';
import { SharedService } from './shared/shared.service';

@Directive({
  selector: '[resizeListener]',
})
export class ResizeListenerDirective implements OnInit {
  constructor(private shared: SharedService) {}

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(throttleTime(250), pluck('target', 'innerWidth'))
      .subscribe((innerWidth) => this.shared.isMobile$.next(innerWidth < 760));
  }
}
