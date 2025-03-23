import { VK } from "vk-io";
import { User } from "../../domain/entities/User";
import { CommandRegistry } from "../../application/services/CommandRegistry";

export class UserBot {
  private vk: VK;
  private commandRegistry: CommandRegistry;

  constructor(private user: User) {
    this.vk = new VK({
      token: this.user.token,
    });

    this.commandRegistry = new CommandRegistry();
    this.setupListeners();
  }

  private setupListeners(): void {
    this.vk.updates.on("message_new", (context) => {
      if (context.senderId !== this.user.userId) return;

      const event = { type: "message_new", text: context.text };
      this.user.handleEvent(event);
    });

    this.vk.updates.start().catch(console.error);
  }
}
