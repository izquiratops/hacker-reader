import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { SharedService } from './shared/shared.service';
import { CustomReuseStrategy } from './shared/routing';

import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    SharedService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
