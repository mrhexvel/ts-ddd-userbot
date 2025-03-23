import { readdirSync } from "fs";
import { join } from "path";
import { User } from "../../domain/entities/User";
import type { VkApiService } from "./VkApiService";

interface Command {
  name: string;
  description: string;
  execute: (
    user: User,
    args: string[],
    vkApiService: VkApiService,
    event: any
  ) => void;
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

  executeCommand(
    user: User,
    commandName: string,
    args: string[],
    vkApiService: VkApiService,
    event: any
  ): void {
    const command = this.commands.get(commandName);
    if (command) {
      command.execute(user, args, vkApiService, event);
    } else {
      console.log(`Command ${commandName} not found.`);
    }
  }

  hasCommand(commandName: string): boolean {
    return this.commands.has(commandName);
  }
}
