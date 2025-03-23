import axios from "axios";
import type { User } from "../domain/entities/User";
import type { Message } from "../types/messages";
import { VkEventManager } from "./VkEventManager";

export class VkClient {
  private apiUrl = "https://api.vk.com/method";
  private token: string;
  private apiVersion = "5.199";
  public LP_VERSION = 19;
  private eventManager: VkEventManager;

  constructor(private user: User) {
    this.user = user;
    this.token = user.token;
    this.eventManager = new VkEventManager(this);
  }

  async callApi<T>(
    method: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    const url = `${this.apiUrl}/${method}`;

    const response = await axios({
      method: "POST",
      url,
      params: {
        ...params,
        access_token: this.token,
        v: this.apiVersion,
      },
    });

    return response.data.response;
  }

  async getLongPollServer(): Promise<any> {
    const response = await this.callApi("messages.getLongPollServer", {
      need_pts: 1,
      lp_version: this.LP_VERSION,
    });
    return response;
  }

  startListening() {
    this.eventManager.on("message_new", (message: Message) => {
      if (!Boolean(message.out)) return;
      this.user.handleEvent(message, this);
    });

    this.eventManager.start();
  }

  stoplistening() {
    this.eventManager.stop();
  }
}
