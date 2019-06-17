export class SocialEvent {
  date: Date;
  location: string;
  title: string;
  url: string;

  constructor(date: Date, location: string, title: string, url: string) {
    this.date = date;
    this.location = location;
    this.title = title;
    this.url = url;
  }
}
