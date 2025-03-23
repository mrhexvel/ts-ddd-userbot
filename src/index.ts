import { config } from "dotenv";
import { UserManager } from "./application/services/UserManager";
import { Database } from "./infrastructure/database/Database";
import { User } from "./domain/entities/User";
import { UserBot } from "./infrastructure/vk/UserBot";

config();

(async () => {
  const userManager = new UserManager();
  const database = new Database(
    process.env.DB_HOST!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    process.env.DB_NAME!
  );

  await database.initialize();

  const usersData = [
    {
      userId: 715616525,
      token: process.env.TOKEN!,
      otherData: "dev",
    },
  ];

  for (const data of usersData) {
    const user = new User(data.userId, data.token, data.otherData);
    userManager.addUser(user);
    const userInDb = await database.getUser(data.userId);

    if (!userInDb) {
      await database.addUser(data.userId, data.token, data.otherData);
    }

    const userBot = new UserBot(user);
  }
})();
