import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';
import { NewsPost } from '../../shared/models/news-post.model';
import { first } from 'rxjs/internal/operators';
import { SocialEvent } from '../../shared/models/social-event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  socialEvents: SocialEvent[] = [];
  activeEvent: SocialEvent;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.db
        .collection<NewsPost>('events', ref => ref.orderBy('date', 'desc'))
        .valueChanges()
        .pipe(first())
        .subscribe((socialEvents: SocialEvent[]) => {
          this.socialEvents = socialEvents;
          if (this.socialEvents.length > 0) {
            this.activeEvent = this.socialEvents[0];
          }
        });
    }
  }

  get upcomingEvents(): SocialEvent[] {
    return this.socialEvents.filter((socialEvent: SocialEvent) => {
      return new Date(socialEvent.date).getTime() > Date.now();
    });
  }

  get pastEvents(): SocialEvent[] {
    return this.socialEvents.filter((socialEvent: SocialEvent) => {
      return new Date(socialEvent.date).getTime() < Date.now();
    });
  }

  setActiveEvent(socialEvent: SocialEvent): void {
    this.activeEvent = socialEvent;
  }

  socialEventActive(socialEvent: SocialEvent): boolean {
    return this.activeEvent === socialEvent;
  }
}
