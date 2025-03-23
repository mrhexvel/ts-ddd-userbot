import { CommandRegistry } from "../../application/services/CommandRegistry";
import type { Message } from "../../types/messages";
import type { VkClient } from "../../vk-library/VkClient";

export class User {
  private commandRegistry: CommandRegistry;

  constructor(
    public userId: number,
    public token: string,
    public otherData?: any
  ) {
    this.commandRegistry = new CommandRegistry();
  }

  async handleEvent(message: Message, client: VkClient): Promise<void> {
    if (message.text?.split(" ")[0] === ".д") {
      const commandText = message.text.slice(3).trim();
      const [commandName, ...args] = commandText.split(" ");
      if (!commandName) return;

      await this.commandRegistry.executeCommand(
        this,
        commandName,
        args,
        client,
        message
      );
    }
  }
}
