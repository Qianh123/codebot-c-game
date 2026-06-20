export function CodeEditorPlaceholder() {
  return (
    <aside className="editor-placeholder" aria-label="代码编辑器预留区域">
      <div className="editor-toolbar">
        <span />
        <span />
        <span />
      </div>
      <pre>{`#include <stdio.h>

int main(void) {
    printf("move forward\\n");
    return 0;
}`}</pre>
    </aside>
  );
}
