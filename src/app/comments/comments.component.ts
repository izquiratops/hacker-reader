import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { finalize, iif, map, of, switchMap } from 'rxjs';

import { HNService } from 'src/app/shared/hn.service';
import { SharedService } from 'src/app/shared/shared.service';
import { opacityAnimation } from 'src/app/shared/animations.model';
import { Item, ItemFlatNode, Palette } from 'src/app/shared/hn.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [opacityAnimation],
})
export class CommentsComponent implements OnInit {
  @ViewChild('scrollElement', { static: true }) scrollEl: ElementRef;

  private readonly transformer = (node: Item, level: number): ItemFlatNode => {
    return {
      ...node,
      level: level,
      color: Palette[level % 7],
      expandable: !!node.kids && node.kids.length > 0,
    };
  };

  treeControl = new FlatTreeControl<ItemFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.replies
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Comments context (UI Bindings)
  item: Item;
  isLoading = false;
  noComments = false;

  constructor(
    private route: ActivatedRoute,
    private hn: HNService,
    public shared: SharedService
  ) {}

  ngOnInit() {
    this.requestStoryData();
  }

  requestStoryData() {
    const id: string = this.route.snapshot.params.id;
    this.isLoading = true;

    of(this.shared.lastItem)
      .pipe(
        // Check if it's shared from Feed page OR must be requested
        switchMap((lastItem) =>
          iif(() => !!lastItem, of(lastItem), this.hn.getItem(+id))
        ),
        map((item) => (this.item = item)),
        // Get the comments
        switchMap((item) => this.hn.getStoryComments(item)),
        map((comments) => {
          if (comments.length > 0) {
            this.dataSource.data = comments;
            this.treeControl.expandAll();
          } else {
            this.noComments = true;
          }
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  hasChild = (_: number, node: ItemFlatNode) => node.expandable;
}
