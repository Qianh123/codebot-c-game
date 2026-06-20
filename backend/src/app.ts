import express from "express";
import { healthRouter } from "./routes/health.js";
import { levelsRouter } from "./routes/levels.js";
import { runCRouter } from "./routes/runC.js";

export const app = express();

app.use(express.json());
app.use("/api", healthRouter);
app.use("/api", levelsRouter);
app.use("/api", runCRouter);
