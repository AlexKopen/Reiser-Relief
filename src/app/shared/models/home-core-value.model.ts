export class CoreValue {
  title: string;
  imageFileName: string;
  altText: string;
  description: string;

  constructor(
    title: string,
    imageFileName: string,
    altText: string,
    description: string
  ) {
    this.title = title;
    this.imageFileName = imageFileName;
    this.altText = altText;
    this.description = description;
  }
}
