import type { User } from "../entities/User";

export interface IUserRepository {
  findUserById(userId: number): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
