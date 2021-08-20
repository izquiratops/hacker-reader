import { NgModule } from '@angular/core';
import {
  PaddingPipe,
  RepliesPipe,
  PostFromPipe,
  DomainPipe,
  IconThemePipe,
  FormatTitlePipe,
  FirstOfPagePipe,
  ProgressModePipe,
} from './shared/hn.pipes';

@NgModule({
  declarations: [
    DomainPipe,
    PostFromPipe,
    RepliesPipe,
    IconThemePipe,
    PaddingPipe,
    FormatTitlePipe,
    FirstOfPagePipe,
    ProgressModePipe,
  ],
  exports: [
    DomainPipe,
    PostFromPipe,
    RepliesPipe,
    IconThemePipe,
    PaddingPipe,
    FormatTitlePipe,
    FirstOfPagePipe,
    ProgressModePipe,
  ],
})
export class PipesModule {}
