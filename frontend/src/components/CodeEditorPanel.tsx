import Editor from "@monaco-editor/react";

type CodeEditorPanelProps = {
  code: string;
  onCodeChange: (code: string) => void;
};

export function CodeEditorPanel({ code, onCodeChange }: CodeEditorPanelProps) {
  return (
    <section className="workspace-panel editor-panel">
      <div className="panel-heading">
        <h2>代码编辑器</h2>
        <span>C</span>
      </div>
      <Editor
        height="420px"
        language="c"
        theme="vs-dark"
        value={code}
        loading={
          <pre className="editor-loading">
            <code>{code}</code>
          </pre>
        }
        onChange={(value) => onCodeChange(value ?? "")}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true
        }}
        aria-label="C 语言代码编辑器"
      />
    </section>
  );
}
