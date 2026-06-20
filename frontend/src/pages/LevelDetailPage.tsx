import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchLevelDetail } from "../api/levels";
import { ActionButtons } from "../components/ActionButtons";
import { CodeEditorPanel } from "../components/CodeEditorPanel";
import { GameMap, type GameMapStatus } from "../components/GameMap";
import { HintPanel } from "../components/HintPanel";
import { ResultPanel, type RunResult } from "../components/ResultPanel";
import type { LevelDetail } from "../types/level";

export function LevelDetailPage() {
  const { id } = useParams();
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);
  const [visibleHintCount, setVisibleHintCount] = useState(0);
  const [hasRequestedExtraHint, setHasRequestedExtraHint] = useState(false);
  const [mapStatus, setMapStatus] = useState<GameMapStatus>("idle");

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
          setCode(data.starterCode);
          setResult(null);
          setVisibleHintCount(0);
          setHasRequestedExtraHint(false);
          setMapStatus("idle");
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

  function handleRun() {
    setResult({
      status: "模拟运行",
      message: "运行请求已记录",
      output: "当前阶段尚未接入 C 编译运行"
    });
    setMapStatus("running");
  }

  function handleSubmit() {
    setResult({
      status: "模拟提交",
      message: "第四阶段将接入后端判题"
    });
    setMapStatus("success");
  }

  function handleReset() {
    if (!level) {
      return;
    }

    setCode(level.starterCode);
    setResult(null);
    setMapStatus("idle");
  }

  function handleHint() {
    if (!level) {
      return;
    }

    if (visibleHintCount < level.hints.length) {
      setVisibleHintCount((current) => current + 1);
      return;
    }

    setHasRequestedExtraHint(true);
  }

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

      <section className="lab-layout">
        <div className="lab-left">
          <GameMap status={mapStatus} />

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

          <div className="sample-grid">
            <article className="detail-section">
              <h2>示例输入</h2>
              <pre>{level.sampleInput || "无输入"}</pre>
            </article>

            <article className="detail-section">
              <h2>示例输出</h2>
              <pre>{level.sampleOutput}</pre>
            </article>
          </div>
        </div>

        <div className="lab-right">
          <CodeEditorPanel code={code} onCodeChange={setCode} />
          <ActionButtons
            onRun={handleRun}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onHint={handleHint}
          />
          <ResultPanel result={result} />
          <HintPanel
            visibleHints={level.hints.slice(0, visibleHintCount)}
            noMoreHints={
              hasRequestedExtraHint && visibleHintCount >= level.hints.length
            }
          />
        </div>
      </section>
    </main>
  );
}
