import { User } from "../../domain/entities/User";
import type { IUserRepository } from "../../domain/repositories/IUserRepository";

export class BotService {
  constructor(private userRepository: IUserRepository) {}

  async handleMessage(
    message: string | undefined,
    userId: string
  ): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      const newUser = new User(userId, "New User");
      await this.userRepository.saveUser(newUser);
    }
  }
}
