import type { User } from "../entities/User";

export interface IUserRepository {
  findUserById(userId: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
