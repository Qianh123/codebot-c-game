type HintPanelProps = {
  visibleHints: string[];
  noMoreHints: boolean;
};

export function HintPanel({ visibleHints, noMoreHints }: HintPanelProps) {
  return (
    <section className="workspace-panel hint-panel">
      <div className="panel-heading">
        <h2>提示</h2>
      </div>
      {visibleHints.length > 0 ? (
        <ol>
          {visibleHints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ol>
      ) : (
        <p className="muted-text">点击提示查看第一条</p>
      )}
      {noMoreHints ? <p className="hint-empty">已经没有更多提示</p> : null}
    </section>
  );
}
