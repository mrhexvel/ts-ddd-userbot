import { User } from "../../domain/entities/User";
import type { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
  private users: Map<number, User> = new Map();

  async findUserById(userId: number): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  async saveUser(user: User): Promise<void> {
    this.users.set(user.userId, user);
  }
}
