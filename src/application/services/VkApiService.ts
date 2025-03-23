import { VK } from "vk-io";
import { logger } from "../../utils/logger";

export class VkApiService {
  public vk: VK;

  constructor(token: string) {
    this.vk = new VK({
      token: token,
    });
  }

  async editMessage(
    peerId: number,
    messageId: number,
    message: string
  ): Promise<void> {
    try {
      await this.vk.api.messages.edit({
        peer_id: peerId,
        message_id: messageId,
        message: message,
      });
      logger.info(`Edit message to user ${peerId}: ${message}`);
    } catch (error: any) {
      logger.error(
        `Failed to Edit message to user ${peerId}: ${error.message}`
      );
    }
  }

  async sendMessage(peerId: number, message: string): Promise<void> {
    try {
      await this.vk.api.messages.send({
        peer_id: peerId,
        message: message,
        random_id: Math.floor(Math.random() * 1000000),
      });
      logger.info(`Sent message to user ${peerId}: ${message}`);
    } catch (error: any) {
      logger.error(
        `Failed to send message to user ${peerId}: ${error.message}`
      );
    }
  }
}
