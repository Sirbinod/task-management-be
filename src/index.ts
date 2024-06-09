import express, { Application } from "express";

import "express-async-errors";

import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import routes from "./routes";
import logger from "morgan";
import { createDefaultUser } from "./seeds/user.seed";

dotenv.config();

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/api", routes);

app.listen(port, () => {
  createDefaultUser();
  console.log(`Server is running on http://localhost:${port}`);
});
