export class SocialEvent {
  date: Date;
  location: string;
  title: string;
  url: string;
  content: string;

  constructor(date: Date, location: string, title: string, url: string, content: string) {
    this.date = date;
    this.location = location;
    this.title = title;
    this.url = url;
    this.content = content;
  }
}
