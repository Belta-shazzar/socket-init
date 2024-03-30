import 'express-async-errors'
import createDatabaseConnection from "./database/mongo";
import notFoundError from "./middleware/notFoundError";

export default async () => {
  await createDatabaseConnection();

  const app = (await import("./app")).default;
  const router = (await import("./router")).default;

  app.use(router);
  app.use(notFoundError);
};
