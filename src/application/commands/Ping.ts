import { User } from "../../domain/entities/User";
import type { Message } from "../../types/messages";
import Emoji from "../../utils/emoji";
import { VkClient } from "../../vk-library/VkClient";

export const pingCommand = {
  name: "пинг",
  description: 'Отвечает "понг" на команду "пинг".',
  execute: async (
    _user: User,
    _args: string[],
    client: VkClient,
    message: Message
  ) => {
    const nowTime = new Date().getTime();

    const createdAtInMs = message.date * 1000;
    const latency = nowTime - createdAtInMs;
    const formattedLatency = Math.round(latency);

    try {
      await client.callApi("messages.edit", {
        peer_id: message.peer_id,
        message: `${Emoji.rocket} Время задержки: ${formattedLatency}мс.`,
        message_id: message.id,
      });
    } catch {}
  },
};
