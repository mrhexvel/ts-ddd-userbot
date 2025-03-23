import type {
  EditMessageParams,
  SendMessageParams,
} from "../types/vk/messages";
import { logger } from "../utils/logger";
import type { VkClient } from "./VkClient";

export async function editMessage(client: VkClient, params: EditMessageParams) {
  try {
    await client.callApi("messages.edit", { ...params });
  } catch (error) {
    await sendMessage(client, {
      peer_id: params.peer_id,
      message_id: params.message_id,
    });
    logger.error(`Something wrong... ${error}`);
  }
}

export async function sendMessage(client: VkClient, params: SendMessageParams) {
  try {
    await client.callApi("messages.send", { ...params });
  } catch (error) {
    await client.callApi("messages.delete", {
      peer_id: params.peer_id,
      message_ids: params.message_id,
    });
    logger.error(`Something wrong... ${error}`);
  }
}
