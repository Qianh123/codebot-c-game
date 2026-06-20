import { levels, type Level, type LevelSummary } from "../data/levels.js";

export function getLevelSummaries(): LevelSummary[] {
  return levels.map(
    ({ id, title, chapter, knowledgePoint, difficulty, description }) => ({
      id,
      title,
      chapter,
      knowledgePoint,
      difficulty,
      description
    })
  );
}

export function getLevelById(id: string): Level | undefined {
  return levels.find((level) => level.id === id);
}
