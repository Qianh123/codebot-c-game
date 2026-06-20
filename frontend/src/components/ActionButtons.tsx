type ActionButtonsProps = {
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onHint: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
};

export function ActionButtons({
  onRun,
  onSubmit,
  onReset,
  onHint,
  isRunning,
  isSubmitting
}: ActionButtonsProps) {
  const isRequesting = isRunning || isSubmitting;

  return (
    <div className="action-buttons" aria-label="代码操作">
      <button type="button" onClick={onRun} disabled={isRequesting}>
        {isRunning ? "运行中..." : "运行"}
      </button>
      <button type="button" onClick={onSubmit} disabled={isRequesting}>
        {isSubmitting ? "提交中..." : "提交"}
      </button>
      <button type="button" className="secondary-action" onClick={onReset}>
        重置
      </button>
      <button type="button" className="secondary-action" onClick={onHint}>
        提示
      </button>
    </div>
  );
}
