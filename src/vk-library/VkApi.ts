import { EventEmitter } from "events";
import type { CommandRegistry } from "../application/services/CommandRegistry";
import type { User } from "../domain/entities/User";
import { VkClient } from "./VkClient";

export class VkApi extends EventEmitter {
  private client: VkClient;

  constructor(user: User, commandRegistry: CommandRegistry) {
    super();
    this.client = new VkClient(user, commandRegistry);
  }

  async sendMessage(peerId: number, message: string): Promise<void> {
    await this.client.callApi("messages.send", {
      peer_id: peerId,
      message: message,
      random_id: Math.floor(Math.random() * 1000000),
    });
  }

  async editMessage(
    peerId: number,
    messageId: number,
    newMessage: string
  ): Promise<void> {
    await this.client.callApi("messages.edit", {
      peer_id: peerId,
      message_id: messageId,
      message: newMessage,
    });
  }

  startListening() {
    this.client.startListening();
  }
}
