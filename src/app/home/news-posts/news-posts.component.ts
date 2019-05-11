import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NewsPost } from '../../shared/models/news-post.model';
import { first } from 'rxjs/internal/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-news-posts',
  templateUrl: './news-posts.component.html',
  styleUrls: ['./news-posts.component.scss']
})
export class NewsPostsComponent implements OnInit {
  newsPosts: NewsPost[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const localNewsPosts = JSON.parse(localStorage.getItem('newsPosts'));
      if (localNewsPosts !== null) {
        this.newsPosts = localNewsPosts;
      }

      this.db
        .collection<NewsPost>('news-posts', ref =>
          ref.orderBy('date', 'desc').limit(5)
        )
        .valueChanges()
        .pipe(first())
        .subscribe(newsPosts => {
          localStorage.setItem('newsPosts', JSON.stringify(newsPosts));
          this.newsPosts = newsPosts;
        });
    }
  }
}
