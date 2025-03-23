import { readdirSync } from "fs";
import { join } from "path";
import { User } from "../../domain/entities/User";
import type { Message } from "../../types/messages";
import type { VkClient } from "../../vk-library/VkClient";

interface Command {
  name: string;
  description: string;
  execute: (
    user: User,
    args: string[],
    client: VkClient,
    message: Message
  ) => Promise<void>;
}

export class CommandRegistry {
  private commands = new Map<string, Command>();

  constructor() {
    this.registerCommands();
  }

  private registerCommands(): void {
    const commandsPath = join(__dirname, "../commands");
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of commandFiles) {
      const module = require(join(commandsPath, file));
      for (const key in module) {
        if (module[key].name && module[key].execute) {
          this.commands.set(module[key].name, module[key]);
        }
      }
    }
  }

  async executeCommand(
    user: User,
    commandName: string,
    args: string[],
    client: VkClient,
    message: Message
  ): Promise<void> {
    const command = this.commands.get(commandName);
    command
      ? await command.execute(user, args, client, message)
      : console.log(`Command ${commandName} not found.`);
  }

  hasCommand(commandName: string): boolean {
    return this.commands.has(commandName);
  }
}
