export type RunResult = {
  status: string;
  message: string;
  output?: string;
};

type ResultPanelProps = {
  result: RunResult | null;
};

export function ResultPanel({ result }: ResultPanelProps) {
  return (
    <section className="workspace-panel result-panel">
      <div className="panel-heading">
        <h2>运行结果</h2>
      </div>
      {result ? (
        <div className="result-content">
          <strong>{result.status}</strong>
          <p>{result.message}</p>
          {result.output ? <pre>{result.output}</pre> : null}
        </div>
      ) : (
        <p className="muted-text">点击运行或提交后，这里会显示模拟结果。</p>
      )}
    </section>
  );
}
