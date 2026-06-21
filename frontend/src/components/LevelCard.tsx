import { Link } from "react-router-dom";
import type { LevelSummary } from "../types/level";
import type { ProgressRecord } from "../utils/progressStorage";

type LevelCardProps = {
  level: LevelSummary;
  progress?: ProgressRecord | null;
};

function getProgressLabel(progress?: ProgressRecord | null): string {
  if (!progress) {
    return "未开始";
  }

  return progress.passed ? "已通过" : "练习中";
}

export function LevelCard({ level, progress }: LevelCardProps) {
  return (
    <Link className="level-card" to={`/levels/${level.id}`}>
      <div className="level-card-header">
        <span>{level.chapter}</span>
        <strong>{level.difficulty}</strong>
      </div>
      <h2>{level.title}</h2>
      <p>{level.description}</p>
      <dl>
        <div>
          <dt>知识点</dt>
          <dd>{level.knowledgePoint}</dd>
        </div>
      </dl>
      <div className="level-progress">
        <strong>{getProgressLabel(progress)}</strong>
        <span>最高分：{progress?.bestScore ?? 0}</span>
        <span>提交次数：{progress?.submitCount ?? 0}</span>
      </div>
    </Link>
  );
}
