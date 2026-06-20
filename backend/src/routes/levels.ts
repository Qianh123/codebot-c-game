import { Router } from "express";
import { getLevelById, getLevelSummaries } from "../services/levels.js";

export const levelsRouter = Router();

levelsRouter.get("/levels", (_request, response) => {
  response.json(getLevelSummaries());
});

levelsRouter.get("/levels/:id", (request, response) => {
  const level = getLevelById(request.params.id);

  if (!level) {
    response.status(404).json({
      error: "Level not found"
    });
    return;
  }

  response.json(level);
});
