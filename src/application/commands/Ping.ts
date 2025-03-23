import { User } from "../../domain/entities/User";
import type { VkApiService } from "../services/VkApiService";

export const pingCommand = {
  name: "пинг",
  description: 'Отвечает "понг" на команду "пинг".',
  execute: (
    user: User,
    args: string[],
    vkApiService: VkApiService,
    event: any
  ) => {
    console.log(`User ${user.userId} executed пинг command with args:`, args);
    vkApiService.editMessage(event.peerId, event.messageId, "сосать.");
  },
};
