import { User } from "../../domain/entities/User";

export const pingCommand = {
  name: "пинг",
  description: 'Отвечает "понг" на команду "пинг".',
  execute: (user: User, args: string[]) => {
    console.log(`User ${user.userId}. args:`, args);
    user.respondToPing();
  },
};
