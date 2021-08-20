import { Component, Input } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Item } from '../shared/hn.model';

@Component({
  selector: 'hn-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item: Item = null;
  @Input() commentsStyle = false;

  constructor(public shared: SharedService) {}

  shareStory(story: Item) {
    // This makes the already known story data (Title, Author, Date) available for the Comments Page.
    // This way we're showing something before loading everything
    this.shared.lastItem = story;
  }
}
