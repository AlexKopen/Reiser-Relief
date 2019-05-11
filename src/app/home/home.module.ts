import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperModule
} from 'ngx-swiper-wrapper';
import { HomeCardsComponent } from './home-cards/home-cards.component';
import { NewsletterSubscribeComponent } from './newsletter-subscribe/newsletter-subscribe.component';
import { CoreValuesComponent } from './core-values/core-values.component';
import { NewsPostsComponent } from './news-posts/news-posts.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  autoplay: { delay: 5000 },
  allowTouchMove: false,
  speed: 1000
};

@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    HomeCardsComponent,
    NewsletterSubscribeComponent,
    CoreValuesComponent,
    NewsPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class HomeModule {}
