import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchLevelDetail } from "../api/levels";
import type { LevelDetail } from "../types/level";

export function LevelDetailPage() {
  const { id } = useParams();
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isHintVisible, setIsHintVisible] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("关卡不存在");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    fetchLevelDetail(id)
      .then((data) => {
        if (isMounted) {
          setLevel(data);
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(
            requestError instanceof Error &&
              requestError.message.includes("status 404")
              ? "关卡不存在"
              : "关卡数据加载失败"
          );
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
  }, [id]);

  if (isLoading) {
    return (
      <main className="page-shell">
        <p className="status-text">正在加载关卡...</p>
      </main>
    );
  }

  if (error || !level) {
    return (
      <main className="page-shell">
        <Link to="/levels" className="text-link">
          返回关卡列表
        </Link>
        <p className="error-text">{error || "关卡不存在"}</p>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <header className="page-header detail-header">
        <Link to="/levels" className="text-link">
          返回关卡列表
        </Link>
        <p className="eyebrow">{level.chapter}</p>
        <h1>{level.title}</h1>
        <div className="meta-row">
          <span>{level.knowledgePoint}</span>
          <strong>{level.difficulty}</strong>
        </div>
      </header>

      <section className="detail-grid">
        <article className="detail-section">
          <h2>任务描述</h2>
          <p>{level.description}</p>
        </article>

        <article className="detail-section">
          <h2>输入格式</h2>
          <p>{level.inputFormat}</p>
        </article>

        <article className="detail-section">
          <h2>输出格式</h2>
          <p>{level.outputFormat}</p>
        </article>

        <article className="detail-section">
          <h2>示例输入</h2>
          <pre>{level.sampleInput || "无输入"}</pre>
        </article>

        <article className="detail-section">
          <h2>示例输出</h2>
          <pre>{level.sampleOutput}</pre>
        </article>

        <article className="detail-section code-section">
          <h2>starterCode</h2>
          <pre>
            <code>{level.starterCode}</code>
          </pre>
        </article>

        <article className="detail-section hint-section">
          <h2>提示</h2>
          {isHintVisible ? (
            <p>{level.hints[0] ?? "当前关卡暂无提示。"}</p>
          ) : (
            <button type="button" onClick={() => setIsHintVisible(true)}>
              点击提示查看第一条
            </button>
          )}
        </article>
      </section>
    </main>
  );
}
