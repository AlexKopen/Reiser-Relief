import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data = [];

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      // server code
    } else {
      const news = this.db
        .collection('news-posts')
        .valueChanges()
        .subscribe(value => {
          console.table(value);
          news.unsubscribe();
        });
    }
  }
}
