import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { NewsPost } from './news-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsPosts: NewsPost[];

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      // server code
    } else {
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
