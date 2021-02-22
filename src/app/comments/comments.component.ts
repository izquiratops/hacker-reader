import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';

import { HNService } from 'src/app/shared/hn.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Animations } from 'src/app/shared/animations';
import { Item, ItemFlatNode } from 'src/app/shared/interfaces';
import { LoadState, Palette } from 'src/app/shared/enums';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [Animations.showItem]
})
export class CommentsComponent implements OnInit {

  @ViewChild('scrollElement', { static: true }) scrollEl: ElementRef;

  private readonly transformer = (node: Item, level: number): ItemFlatNode => {
    return {
      ...node,
      level: level,
      color: Palette[level % 7],
      expandable: !!node.kids && node.kids.length > 0
    };
  }

  treeControl = new FlatTreeControl<ItemFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.replies
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Comments context (UI Bindings)
  currentItem$: Observable<Item>;
  loadState$: BehaviorSubject<LoadState>;
  emptyItem$: BehaviorSubject<boolean>;

  constructor(
    private route: ActivatedRoute,
    private hn: HNService,
    public shared: SharedService
  ) {
    this.loadState$ = new BehaviorSubject<LoadState>(LoadState.WAITING);
    this.emptyItem$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;

    this.currentItem$ = this.hn.getItem(+id);
    this.hn.getStoryComments(this.currentItem$).subscribe((comments: Item[]) => {
      if (comments.length === 0) {
        // Oopsie no comments!
        this.emptyItem$.next(true);
      } else {
        this.dataSource.data = comments;
        this.treeControl.expandAll();
      }

      this.loadState$.next(LoadState.IDLE);
    });
  }

  hasChild = (_: number, node: ItemFlatNode) => node.expandable;

}
