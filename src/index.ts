import { config } from "dotenv";
import { User } from "./domain/entities/User";
import { Database } from "./infrastructure/database/Database";
import { VkApi } from "./vk-library/VkApi";

config();

(async () => {
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
    {
      userId: 575107090,
      token: process.env.KARP_TOKEN!,
      otherData: "lox",
    },
  ];

  for (const data of usersData) {
    const userInDb = await database.getUser(data.userId);
    const user = new User(data.userId, data.token, data.otherData);

    if (!userInDb) {
      await database.addUser(data.userId, data.token, data.otherData);
    }

    const vkApi = new VkApi(user);
    vkApi.startListening();
  }
})();
