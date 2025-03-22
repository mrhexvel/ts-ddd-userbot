export class User {
  constructor(
    public userId: string,
    public token: string,
    public otherData?: any
  ) {}

  handleEvent(event: any): void {
    if (event.type === "message_new" && event.text === "!пинг") {
      console.log(`User ${this.userId} received a ping!`);
      this.respondToPing();
    }
  }

  respondToPing(): void {
    console.log(`User ${this.userId} responds: pong!`);
  }
}
