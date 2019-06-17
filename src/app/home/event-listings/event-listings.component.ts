import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';
import { NewsPost } from '../../shared/models/news-post.model';
import { first } from 'rxjs/internal/operators';
import { SocialEvent } from '../../shared/models/social-event.model';

@Component({
  selector: 'app-event-listings',
  templateUrl: './event-listings.component.html',
  styleUrls: ['./event-listings.component.scss']
})
export class EventListingsComponent implements OnInit {
  events: SocialEvent[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const localEvents = JSON.parse(localStorage.getItem('events'));
      if (localEvents !== null) {
        this.events = localEvents;
      }

      const currentDate = new Date();
      const dateFormatted =
        currentDate.getFullYear() +
        '-' +
        ('0' + (currentDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + currentDate.getDate()).slice(-2);
      console.log(dateFormatted);

      this.db
        .collection<SocialEvent>('events', ref =>
          ref.orderBy('date', 'asc').where('date', '>=', dateFormatted)
        )
        .valueChanges()
        .pipe(first())
        .subscribe(newsPosts => {
          localStorage.setItem('events', JSON.stringify(newsPosts));
          this.events = newsPosts;
        });
    }
  }
}
