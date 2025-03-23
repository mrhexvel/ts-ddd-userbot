import { CommandRegistry } from "../../application/services/CommandRegistry";

export class User {
  private commandRegistry: CommandRegistry;

  constructor(
    public userId: number,
    public token: string,
    public otherData?: any
  ) {
    this.commandRegistry = new CommandRegistry();
  }

  handleEvent(event: any): void {
    if (event.type === "message_new" && event.text?.split(" ")[0] === ".д") {
      const commandText = event.text.slice(3).trim();
      const [commandName, ...args] = commandText.split(" ");
      this.commandRegistry.executeCommand(this, commandName, args);
    }
  }

  respondToPing(): void {
    console.log(`User ${this.userId} responds: понг`);
  }
}
