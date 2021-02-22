import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { scan} from 'rxjs/operators';

import { HNService } from '../shared/hn.service';
import { SharedService } from '../shared/shared.service';
import { FeedType, LoadState, Theme } from '../shared/enums';
import { Item } from '../shared/interfaces';
import { Animations } from '../shared/animations';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [ Animations.showItem ]
})
export class FeedComponent implements OnInit {

  @ViewChild('scrollElement', { static: true }) scrollEl: ElementRef;

  // Page context
  page: number = 0;
  scrollTop: number = 0;
  loadState$: BehaviorSubject<LoadState>;

  // Stories
  ids: number[] = [];
  type$: BehaviorSubject<FeedType>;
  stories$: BehaviorSubject<Item[]>;

  FeedType = FeedType;
  LoadState = LoadState;

  constructor(
    private router: Router,
    private hn: HNService,
    public shared: SharedService
  ) {
    this.loadState$ = new BehaviorSubject<LoadState>(LoadState.WAITING);
    this.type$ = new BehaviorSubject<FeedType>(FeedType.TOP);
    this.stories$ = new BehaviorSubject<Item[]>([]);

    // Listener to save the current scroll position when navigates into comments.
    this.router.events.subscribe((event) => {
      // Apply scroll when navigate back
      if (event instanceof NavigationEnd && event.url === '/') {
        // Disable smooth behavior to avoid scroll animations on resume
        this.scrollEl.nativeElement.style.setProperty('scroll-behavior', 'initial');
        this.scrollEl.nativeElement.scrollTop = this.scrollTop;
        this.scrollEl.nativeElement.style.setProperty('scroll-behavior', 'smooth');
      }
    });
  }

  idTracker = (index: number, item: Item) => item.id;


  /**
   * First time load, without this the list would be empty.
   */
  ngOnInit() {
    this.setFeedType(FeedType.TOP);
  }

  switchTheme() {
    const previousTheme = this.shared.currentTheme$.getValue();
    this.shared.currentTheme$.next((previousTheme === Theme.LIGHT) ? Theme.DARK : Theme.LIGHT);
  }

  /**
   * Saves current scroll state and navigates into Comments.
   * @param id ID of the story
   */
  navigateIntoComments(id: number): void {
    this.scrollTop = this.scrollEl.nativeElement.scrollTop;
    this.router.navigate([id]);
  }

  /**
   * Changes type value, empty the current stories array and request the new ones.
   * 
   * @param type Kind of feed
   */
  setFeedType(type: FeedType): void {
    this.loadState$.next(LoadState.WAITING);
    this.stories$.next([]);
    this.type$.next(type);
    this.page = 0;

    this.hn.getStoryIndices(this.type$.getValue()).subscribe(ids => {
      this.ids = ids;
      this.requestContentFromStories();
    });
  }

  /**
   * Loads the first page (30 items) of the current type (Top Stories by default).
   */
  requestContentFromStories(offset: number = 0): void {
    this.hn.getItemsContent(this.ids.slice(offset, offset + 30)).pipe(
      scan((acc, curr) => [...acc, ...curr], this.stories$.getValue())
    ).subscribe(res => {
      this.stories$.next(res);
      this.loadState$.next(LoadState.IDLE);
    });
  }

  /**
   * Keeps requesting items, appends 30 more into the list.
   */
  infiniteLoad(): void {
    this.page++;
    this.requestContentFromStories(this.page * 30);
  };
}
