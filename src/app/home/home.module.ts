import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { NewsletterSubscribeComponent } from './newsletter-subscribe/newsletter-subscribe.component';
import { NewsPostsComponent } from './news-posts/news-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeValuesComponent } from './home-values/home-values.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    HomeCardsComponent,
    NewsletterSubscribeComponent,
    NewsPostsComponent,
    HomeValuesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    ReactiveFormsModule
  ],
  providers: []
})
export class HomeModule {}
