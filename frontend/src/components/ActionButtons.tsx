type ActionButtonsProps = {
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onHint: () => void;
};

export function ActionButtons({
  onRun,
  onSubmit,
  onReset,
  onHint
}: ActionButtonsProps) {
  return (
    <div className="action-buttons" aria-label="代码操作">
      <button type="button" onClick={onRun}>
        运行
      </button>
      <button type="button" onClick={onSubmit}>
        提交
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
