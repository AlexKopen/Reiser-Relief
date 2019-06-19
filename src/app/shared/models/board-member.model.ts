export class BoardMember {
  headShotFileName: string;
  name: string;
  position: string;
  email: string;

  constructor(
    headShotFileName: string,
    name: string,
    position: string,
    email: string
  ) {
    this.headShotFileName = headShotFileName;
    this.name = name;
    this.position = position;
    this.email = email;
  }
}
