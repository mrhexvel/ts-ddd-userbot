import { VK } from "vk-io";
import { User } from "../../domain/entities/User";

export class UserBot {
  private vk: VK;

  constructor(private user: User) {
    this.vk = new VK({
      token: this.user.token,
    });

    this.vk.api.account.getProfileInfo({}).then(console.log);
    this.setupListeners();
  }

  private setupListeners(): void {
    this.vk.updates.on("message_new", (context) => {
      const event = { type: "message_new", text: context.text };
      this.user.handleEvent(event);
    });

    this.vk.updates.start().catch(console.error);
  }
}
