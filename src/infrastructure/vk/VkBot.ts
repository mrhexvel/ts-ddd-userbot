import { VK } from "vk-io";
import { UserManager } from "../../application/services/UserManager";

export class VkBot {
  private vk: VK;

  constructor(private token: string, private userManager: UserManager) {
    this.vk = new VK({
      token: this.token,
    });

    this.setupListeners();
  }

  private setupListeners(): void {
    this.vk.updates.on("message_new", (context) => {
      const userId = context.senderId.toString();
      const event = { type: "message_new", text: context.text };
      this.userManager.sendEventToUser(userId, event);
    });

    this.vk.updates.start().catch(console.error);
  }
}
