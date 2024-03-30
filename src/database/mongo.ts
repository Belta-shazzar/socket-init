import { connect } from "mongoose";
import config from "../config";
import log from "../lib/logger";

// eslint-disable-next-line import/prefer-default-export
const createMongodbConnection = async () => {
  await connect(config.database.uri).then(() =>
    log.info("connected to mongo db server")
  );
};

export default createMongodbConnection;
