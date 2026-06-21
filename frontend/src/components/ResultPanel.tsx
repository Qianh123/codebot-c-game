import type {
  RunCResponse,
  RunCStatus,
  SubmitLevelErrorType,
  SubmitLevelResponse
} from "../api/code";
import { generateErrorDiagnosis } from "../utils/errorDiagnosis";

export type ResultPanelResult =
  | {
      kind: "run";
      data: RunCResponse;
      code: string;
    }
  | {
      kind: "submit";
      data: SubmitLevelResponse;
      code: string;
    }
  | {
      kind: "network_error";
      source: "run" | "submit";
      code?: string;
      message: string;
    };

type ResultPanelProps = {
  result: ResultPanelResult | null;
};

const runStatusMessages: Record<RunCStatus, string> = {
  success: "程序运行完成。",
  compile_error: "代码编译失败，请检查语法，例如分号、括号、变量名。",
  timeout: "程序运行超时，可能存在死循环。",
  runtime_error: "程序运行时出错。"
};

const submitErrorMessages: Record<Exclude<SubmitLevelErrorType, null>, string> = {
  compile_error: "代码编译失败，请检查语法，例如分号、括号、变量名。",
  timeout: "程序运行超时，可能存在死循环。",
  runtime_error: "程序运行时出错。",
  wrong_answer: "程序能运行，但输出结果和题目要求不一致。",
  level_not_found: "关卡不存在，请返回关卡列表重新选择。",
  invalid_request: "提交内容不完整，请检查关卡和代码。"
};

function renderOutput(label: string, value: string) {
  if (!value) {
    return null;
  }

  return (
    <div className="result-output">
      <span>{label}</span>
      <pre>{value}</pre>
    </div>
  );
}

function renderDiagnosis(diagnosis: string) {
  return (
    <div className="diagnosis-box">
      <h3>错误诊断</h3>
      {diagnosis.split("\n").map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

export function ResultPanel({ result }: ResultPanelProps) {
  const title =
    result?.kind === "submit" ||
    (result?.kind === "network_error" && result.source === "submit")
      ? "提交判题结果"
      : "运行结果";

  return (
    <section className="workspace-panel result-panel">
      <div className="panel-heading">
        <h2>{title}</h2>
      </div>

      {!result ? (
        <p className="muted-text">点击运行或提交后，这里会显示真实结果。</p>
      ) : null}

      {result?.kind === "network_error" ? (
        <div className="result-content result-error">
          <strong>network_error</strong>
          <p>{result.message}</p>
          {renderDiagnosis(
            generateErrorDiagnosis({
              errorType: "network_error",
              code: result.code
            })
          )}
        </div>
      ) : null}

      {result?.kind === "run" ? (
        <div className="result-content">
          <strong>{result.data.status}</strong>
          <p>{runStatusMessages[result.data.status]}</p>
          {result.data.status !== "success"
            ? renderDiagnosis(
                generateErrorDiagnosis({
                  errorType: result.data.status,
                  stderr: result.data.stderr,
                  code: result.code
                })
              )
            : null}
          {renderOutput("标准输出 stdout", result.data.stdout)}
          {renderOutput("原始错误信息 stderr", result.data.stderr)}
          <p className="result-time">耗时：{result.data.timeMs}ms</p>
        </div>
      ) : null}

      {result?.kind === "submit" ? (
        <div className="result-content">
          <strong>{result.data.passed ? "全部通过" : "未通过"}</strong>
          <p>得分：{result.data.score}</p>
          <p>{result.data.message}</p>
          {result.data.errorType ? (
            <>
              <p>错误类型：{result.data.errorType}</p>
              <p>{submitErrorMessages[result.data.errorType]}</p>
            </>
          ) : null}
          {!result.data.passed
            ? renderDiagnosis(
                generateErrorDiagnosis({
                  errorType: result.data.errorType ?? "wrong_answer",
                  stderr: result.data.stderr,
                  code: result.code,
                  message: result.data.message,
                  results: result.data.results
                })
              )
            : null}
          {renderOutput("原始错误信息 stderr", result.data.stderr ?? "")}

          {result.data.results.length > 0 ? (
            <div className="judge-results">
              {result.data.results.map((testResult) => (
                <article
                  className={`judge-result ${testResult.passed ? "judge-pass" : "judge-fail"}`}
                  key={`${testResult.name}-${testResult.input}`}
                >
                  <div className="judge-result-header">
                    <h3>{testResult.name}</h3>
                    <div className="judge-badges">
                      {testResult.hidden ? <span>隐藏测试</span> : null}
                      <strong>{testResult.passed ? "通过" : "失败"}</strong>
                    </div>
                  </div>
                  <p>状态：{testResult.status}</p>
                  <p>输入：{testResult.input || "无输入"}</p>
                  <p>期望输出：{testResult.expectedOutput}</p>
                  <p>实际输出：{testResult.actualOutput || "无输出"}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
