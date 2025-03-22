import { User } from "../../domain/entities/User";

export class UserManager {
  private users: Map<string, User> = new Map();

  addUser(user: User): void {
    this.users.set(user.userId, user);
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  removeUser(userId: string): boolean {
    return this.users.delete(userId);
  }

  sendEventToUser(userId: string, event: any): void {
    const user = this.getUser(userId);
    if (user) {
      user.handleEvent(event);
    }
  }
}
