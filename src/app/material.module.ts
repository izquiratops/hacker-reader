import {NgModule} from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  exports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTreeModule,
    OverlayModule
  ]
})
export class MaterialModule {}
