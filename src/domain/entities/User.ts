import { CommandRegistry } from "../../application/services/CommandRegistry";
import type { VkApiService } from "../../application/services/VkApiService";
import { logger } from "../../utils/logger";

export class User {
  private commandRegistry: CommandRegistry;

  constructor(
    public userId: number,
    public token: string,
    public otherData?: any
  ) {
    this.commandRegistry = new CommandRegistry();
  }

  async handleEvent(event: any, vkApiService: VkApiService): Promise<void> {
    if (event.type === "message_new" && event.text?.split(" ")[0] === ".д") {
      const commandText = event.text.slice(3).trim();
      const [commandName, ...args] = commandText.split(" ");
      logger.info(
        `User ${this.userId} is executing command: ${commandName} with args: ${args}`
      );
      await this.commandRegistry.executeCommand(
        this,
        commandName,
        args,
        vkApiService,
        event
      );
    }
  }
}
