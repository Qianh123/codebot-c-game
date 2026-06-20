import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLevelSummaries } from "../api/levels";
import { LevelCard } from "../components/LevelCard";
import type { LevelSummary } from "../types/level";

export function LevelListPage() {
  const [levels, setLevels] = useState<LevelSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchLevelSummaries()
      .then((data) => {
        if (isMounted) {
          setLevels(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("关卡数据加载失败");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <header className="page-header">
        <Link to="/" className="text-link">
          返回首页
        </Link>
        <h1>关卡列表</h1>
        <p>选择一个 C 语言任务，查看说明和 starterCode。</p>
      </header>

      {isLoading ? <p className="status-text">正在加载关卡...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!isLoading && !error ? (
        <section className="level-grid" aria-label="关卡">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
