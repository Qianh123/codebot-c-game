import { Router } from "express";
import { runCProgram } from "../services/cRunner.js";

export const runCRouter = Router();

runCRouter.post("/run-c", async (request, response) => {
  const { code, stdin } = request.body as {
    code?: unknown;
    stdin?: unknown;
  };

  if (typeof code !== "string") {
    response.status(400).json({
      error: "code must be a string"
    });
    return;
  }

  if (stdin !== undefined && typeof stdin !== "string") {
    response.status(400).json({
      error: "stdin must be a string"
    });
    return;
  }

  const result = await runCProgram({
    code,
    stdin: stdin ?? ""
  });

  response.json(result);
});
