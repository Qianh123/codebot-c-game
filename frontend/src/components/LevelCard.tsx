import { Link } from "react-router-dom";
import type { LevelSummary } from "../types/level";

type LevelCardProps = {
  level: LevelSummary;
};

export function LevelCard({ level }: LevelCardProps) {
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
    </Link>
  );
}
