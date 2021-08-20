import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../material.module';
import { PipesModule } from '../pipes.module';

import { FeedComponent } from './feed.component';
import { CommentsComponent } from '../comments/comments.component';
import { ItemComponent } from '../item/item.component';
import { AutoHideDirective } from '../shared/auto-hide.directive';
import { HNService } from '../shared/hn.service';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: ':id',
    component: CommentsComponent,
  },
];

@NgModule({
  declarations: [
    FeedComponent,
    CommentsComponent,
    ItemComponent,
    AutoHideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    PipesModule,
  ],
  providers: [HNService],
})
export class FeedModule {}
