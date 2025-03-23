import axios from "axios";
import { EventEmitter } from "events";
import type { MessageData, Update } from "../types/messages";
import { VkClient } from "./VkClient";

export class VkEventManager extends EventEmitter {
  private client: VkClient;
  private longPollServer: any;
  private ts: string | null = null;
  private pts: number | null = null;
  private isRunning: boolean = true;

  constructor(client: VkClient) {
    super();
    this.client = client;
  }

  async start() {
    this.isRunning = true;
    this.longPollServer = await this.client.getLongPollServer();
    this.listenForUpdates();
  }

  async stop() {
    this.isRunning = false;
    this.ts = null;
    this.pts = null;
    this.longPollServer = null;

    this.removeAllListeners();
  }

  private async listenForUpdates() {
    try {
      const params = new URLSearchParams({
        act: "a_check",
        key: this.longPollServer.key,
        ts: this.ts || "",
        pts: this.pts?.toString() || "",
        wait: "25",
        mode: "2",
        version: "3",
      });

      const url = `https://${this.longPollServer.server}?${params}`;
      const response = await axios.get(url);

      if (response.data.failed !== undefined) {
        this.ts = response.data.ts;
        this.longPollServer = await this.client.getLongPollServer();
      } else {
        this.ts = response.data.ts;
        this.pts = response.data.pts;

        response.data.updates.forEach(async (update: any) => {
          await this.handleUpdate(update);
        });
      }

      this.listenForUpdates();
    } catch (error) {
      console.error("Error listening for updates:", error);
      setTimeout(() => this.listenForUpdates(), 1000);
    }
  }

  private async handleUpdate(update: Update) {
    if (update[0] === 4) {
      try {
        const messageData = await this.client.callApi<MessageData>(
          "messages.getById",
          {
            message_ids: update[1].toString(),
          }
        );

        if (messageData.items && messageData.items.length > 0) {
          const message = messageData.items[0];
          this.emit("message_new", message);
        }
      } catch (error) {
        console.error("Error fetching message data:", error);
      }
    }
  }
}
