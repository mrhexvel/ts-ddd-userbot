import { VK } from "vk-io";
import { User } from "../../domain/entities/User";
import { CommandRegistry } from "../../application/services/CommandRegistry";
import { logger } from "../../utils/logger";
import { VkApiService } from "../../application/services/VkApiService";

export class UserBot {
  private vkApiService: VkApiService;
  private commandRegistry: CommandRegistry;

  constructor(private user: User, commandRegistry: CommandRegistry) {
    this.vkApiService = new VkApiService(user.token);
    this.commandRegistry = commandRegistry;
    this.setupListeners();
  }

  private setupListeners(): void {
    this.vkApiService.vk.updates.on("message_new", async (context) => {
      await context.loadMessagePayload();

      const event = {
        type: "message_new",
        text: context.text,
        messageId: context.id,
        peerId: context.peerId,
      };
      logger.info(`New message from user ${this.user.userId}: ${context.text}`);
      this.user.handleEvent(event, this.vkApiService);
    });

    this.vkApiService.vk.updates.start().catch(logger.error);
  }
}
