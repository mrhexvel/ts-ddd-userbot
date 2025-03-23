import type { VkApi } from "../../vk-library/VkApi";

export class UsersCombiner {
  private users: Map<number, VkApi>;

  constructor() {
    this.users = new Map<number, VkApi>();
  }

  has(userId: number) {
    return this.users.has(userId);
  }

  addUser(userId: number, apiInstance: VkApi): void {
    this.users.set(userId, apiInstance);
  }

  removeUser(userId: number): void {
    this.users.delete(userId);
  }

  getUser(userId: number): VkApi | undefined {
    return this.users.get(userId);
  }
}
