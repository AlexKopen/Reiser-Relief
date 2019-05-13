export class HomeCard {
  title: string;
  iconClass: string;
  description: string;
  routerLink: string;
  buttonText: string;

  constructor(
    title: string,
    iconClass: string,
    description: string,
    routerLink: string,
    buttonText: string
  ) {
    this.title = title;
    this.iconClass = iconClass;
    this.description = description;
    this.routerLink = routerLink;
    this.buttonText = buttonText;
  }
}
