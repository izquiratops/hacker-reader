import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Subscription,
  startWith,
  fromEvent,
  map,
  pairwise,
  distinctUntilChanged,
  skipUntil,
  interval,
} from 'rxjs';

@Directive({
  selector: '[autoHide]',
})
export class AutoHideDirective implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @Input() scrollElement: HTMLDivElement;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.setProperty('transition', 'margin-top 0.3s');

    this.subscription.add(
      fromEvent(this.scrollElement, 'scroll')
        .pipe(
          startWith(this.scrollElement.scrollTop),
          // Avoid autohide when routes back from comments and resume the scroll
          skipUntil(interval(1000)),
          map(() => this.scrollElement.scrollTop),
          pairwise(),
          map(([curr, prev]) => curr < prev),
          distinctUntilChanged()
        )
        .subscribe((scrollingDown) => {
          if (scrollingDown) {
            this.el.nativeElement.style.setProperty('margin-top', '-60px');
          } else {
            this.el.nativeElement.style.setProperty('margin-top', '0');
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
