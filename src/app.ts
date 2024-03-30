import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

const app = express();

app.set('trust proxy', true);
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan(config.env.isProduction ? 'common' : 'dev'));

export default app