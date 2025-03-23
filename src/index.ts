import { config } from "dotenv";
import { User } from "./domain/entities/User";
import { UsersCombiner } from "./domain/entities/UsersCombiner";
import { Database } from "./infrastructure/database/Database";
import { VkApi } from "./vk-library/VkApi";

config();

(async () => {
  const combiner = new UsersCombiner();
  const database = new Database(
    process.env.DB_HOST!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    process.env.DB_NAME!
  );

  await database.initialize();

  const usersData = await database.getAllUsers();

  for (const data of usersData) {
    const user = new User(data.id, data.token, data.other_data);

    if (combiner.has(user.userId)) {
      combiner.getUser(user.userId)?.stoplistening();
      combiner.removeUser(user.userId);
    }

    const vkApi = new VkApi(user);
    combiner.addUser(user.userId, vkApi);
    vkApi.startListening();
  }
})();
