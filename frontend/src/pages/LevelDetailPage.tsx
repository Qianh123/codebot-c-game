import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ApiRequestError,
  runCCode,
  submitLevel,
  type SubmitLevelResponse
} from "../api/code";
import { fetchLevelDetail } from "../api/levels";
import { ActionButtons } from "../components/ActionButtons";
import { CodeEditorPanel } from "../components/CodeEditorPanel";
import { GameMap, type GameMapStatus } from "../components/GameMap";
import { HintPanel } from "../components/HintPanel";
import { ResultPanel, type ResultPanelResult } from "../components/ResultPanel";
import type { LevelDetail } from "../types/level";
import { generateErrorDiagnosis } from "../utils/errorDiagnosis";
import { saveMistake } from "../utils/mistakes";

const networkErrorMessage = "无法连接后端，请确认 npm run dev 正在运行。";

function createRecordId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isSubmitLevelResponse(value: unknown): value is SubmitLevelResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "passed" in value &&
    "score" in value &&
    "errorType" in value &&
    "message" in value &&
    "results" in value
  );
}

export function LevelDetailPage() {
  const { id } = useParams();
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [customStdin, setCustomStdin] = useState("");
  const [result, setResult] = useState<ResultPanelResult | null>(null);
  const [visibleHintCount, setVisibleHintCount] = useState(0);
  const [hasRequestedExtraHint, setHasRequestedExtraHint] = useState(false);
  const [mapStatus, setMapStatus] = useState<GameMapStatus>("idle");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          setCustomStdin(data.sampleInput);
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

  async function handleRun() {
    setIsRunning(true);
    setResult(null);
    setMapStatus("running");

    try {
      const runResult = await runCCode(code, customStdin);

      setResult({
        kind: "run",
        data: runResult,
        code
      });
      setMapStatus(runResult.status === "success" ? "success" : "error");
    } catch {
      setResult({
        kind: "network_error",
        source: "run",
        code,
        message: networkErrorMessage
      });
      setMapStatus("error");
    } finally {
      setIsRunning(false);
    }
  }

  async function handleSubmit() {
    if (!id) {
      return;
    }

    setIsSubmitting(true);
    setResult(null);
    setMapStatus("running");

    function handleSubmitResult(submitResult: SubmitLevelResponse) {
      setResult({
        kind: "submit",
        data: submitResult,
        code
      });
      setMapStatus(submitResult.passed ? "success" : "error");

      if (!submitResult.passed && level) {
        const diagnosis = generateErrorDiagnosis({
          errorType: submitResult.errorType ?? "wrong_answer",
          stderr: submitResult.stderr,
          code,
          message: submitResult.message,
          results: submitResult.results
        });

        saveMistake({
          id: createRecordId(),
          levelId: level.id,
          levelTitle: level.title,
          knowledgePoint: level.knowledgePoint,
          code,
          errorType: submitResult.errorType ?? "wrong_answer",
          message: submitResult.message,
          diagnosis,
          score: submitResult.score,
          time: new Date().toISOString()
        });
      }
    }

    try {
      const submitResult = await submitLevel(id, code);

      handleSubmitResult(submitResult);
    } catch (submitError) {
      if (
        submitError instanceof ApiRequestError &&
        isSubmitLevelResponse(submitError.data)
      ) {
        handleSubmitResult(submitError.data);
        return;
      }

      setResult({
        kind: "network_error",
        source: "submit",
        code,
        message: networkErrorMessage
      });
      setMapStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
        <Link to="/mistakes" className="text-link">
          错题本
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
        <Link to="/mistakes" className="text-link">
          错题本
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
          <section className="workspace-panel stdin-panel">
            <div className="panel-heading">
              <h2>自定义输入</h2>
            </div>
            <textarea
              aria-label="自定义输入"
              value={customStdin}
              onChange={(event) => setCustomStdin(event.target.value)}
              placeholder="没有输入时可以留空"
            />
          </section>
          <ActionButtons
            onRun={handleRun}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onHint={handleHint}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
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
