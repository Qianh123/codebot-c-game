import { Router } from "express";
import { getLevelById } from "../services/levels.js";
import { judgeLevelSubmission } from "../services/judge.js";

export const submitLevelRouter = Router();

submitLevelRouter.post("/submit-level", async (request, response) => {
  const { levelId, code } = request.body as {
    levelId?: unknown;
    code?: unknown;
  };

  if (typeof levelId !== "string" || levelId.trim() === "") {
    response.status(400).json({
      passed: false,
      score: 0,
      errorType: "invalid_request",
      message: "请选择要提交的关卡",
      results: []
    });
    return;
  }

  if (typeof code !== "string" || code.trim() === "") {
    response.status(400).json({
      passed: false,
      score: 0,
      errorType: "invalid_request",
      message: "请提交 C 语言代码",
      results: []
    });
    return;
  }

  const level = getLevelById(levelId);

  if (!level) {
    response.status(404).json({
      passed: false,
      score: 0,
      errorType: "level_not_found",
      message: "关卡不存在",
      results: []
    });
    return;
  }

  const result = await judgeLevelSubmission(level, code);
  response.json(result);
});
