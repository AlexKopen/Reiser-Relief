import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot(
      [
        { path: '', loadChildren: './home/home.module#HomeModule' },
        { path: 'about', loadChildren: './about/about.module#AboutModule' },
        {
          path: 'missions',
          loadChildren: './missions/missions.module#MissionsModule'
        },
        { path: 'donate', loadChildren: './donate/donate.module#DonateModule' },
        { path: 'events', loadChildren: './events/events.module#EventsModule' },
        {
          path: 'contact',
          loadChildren: './contact/contact.module#ContactModule'
        }
      ],
      { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }
    ),
    TransferHttpCacheModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
