import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { ResizeListenerDirective } from './resize-listener.directive';
import { SharedService } from './shared/shared.service';

import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feed/feed.module').then((m) => m.FeedModule),
  },
];

@NgModule({
  declarations: [AppComponent, ResizeListenerDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
