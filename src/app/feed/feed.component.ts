import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { finalize, scan } from 'rxjs/operators';

import { HNService } from '../shared/hn.service';
import { SharedService } from '../shared/shared.service';
import { Item, TYPES, TYPE_ICONS, TYPE_LABELS } from '../shared/hn.model';
import { opacityAnimation } from '../shared/animations.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [opacityAnimation],
})
export class FeedComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollElement', { static: true }) scrollElement: ElementRef;

  readonly ITEMS_PER_PAGE = 30;
  isLoading: boolean = false;
  TYPES = TYPES;
  TYPE_LABELS = TYPE_LABELS;
  TYPE_ICONS = TYPE_ICONS;

  constructor(private hn: HNService, public shared: SharedService) {}

  ngOnInit() {
    // Page -1 means FIRST page load, after that the lower page count is 0
    if (this.shared.feedPage === -1) {
      this.getFeedContent(TYPES[0]);
    }
  }

  ngAfterViewInit() {
    // Disable smooth behavior to avoid scroll animations on resume
    const feedElement = this.scrollElement.nativeElement;
    feedElement.style.setProperty('scroll-behavior', 'initial');
    feedElement.scrollTop = this.shared.feedScrollPosition;
    feedElement.style.setProperty('scroll-behavior', 'smooth');
  }

  ngOnDestroy() {
    const scrollPosition = this.scrollElement.nativeElement.scrollTop;
    this.shared.feedScrollPosition = scrollPosition;
  }

  idTracker = (index: number, item: Item) => item.id;

  switchTheme() {
    this.shared.switchDark$.next(null);
  }

  /**
   * Changes type value, empty the current stories array and request the new ones.
   *
   * @param type Kind of feed
   */
  getFeedContent(type: string): void {
    // Reset stories as an empty list
    this.shared.feedType = type;
    this.shared.feedPage = 0;
    this.shared.feedIds = [];
    this.shared.feedStories.next([]);

    // Get the first page
    this.isLoading = true;
    this.hn.getStoryIDs(this.shared.feedType).subscribe((ids) => {
      this.shared.feedIds = ids;
      this.getStories();
    });
  }

  /**
   * Loads the first page of the current type (Top Stories by default).
   */
  getStories(itemOffset: number = 0): void {
    const targetIDs = this.shared.feedIds.slice(itemOffset, itemOffset + 30);

    this.hn
      .getItemsContent(targetIDs)
      .pipe(
        scan((acc, curr) => [...acc, ...curr], this.shared.feedStories.value),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((stories) => this.shared.feedStories.next(stories));
  }

  /**
   * Keeps requesting items, appends 30 more into the list.
   */
  infiniteLoad(): void {
    this.shared.feedPage++;
    this.getStories(this.shared.feedPage * this.ITEMS_PER_PAGE);
  }

  scrollToTheTop(): void {
    this.scrollElement.nativeElement.scrollTop = 0;
  }
}
