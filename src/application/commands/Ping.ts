import { User } from "../../domain/entities/User";
import type { Event } from "../../types/Event";
import type { VkApiService } from "../services/VkApiService";

export const pingCommand = {
  name: "пинг",
  description: 'Отвечает "понг" на команду "пинг".',
  execute: async (
    user: User,
    args: string[],
    vkApiService: VkApiService,
    event: Event
  ) => {
    console.log(`User ${user.userId} executed пинг command with args:`, args);
    await vkApiService.editMessage(event.peerId, event.messageId, "сосать.");
  },
};
