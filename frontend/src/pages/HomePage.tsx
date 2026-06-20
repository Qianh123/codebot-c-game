import { CodeEditorPlaceholder } from "../components/CodeEditorPlaceholder";

export function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Web C Learning Game</p>
          <h1 id="home-title">CodeBot C 编程实验室</h1>
          <p className="intro">用 C 语言控制机器人闯关的编程教学游戏</p>
          <nav className="hero-actions" aria-label="主要导航">
            <button type="button">开始学习</button>
            <button type="button" className="secondary">
              关卡列表
            </button>
          </nav>
        </div>
        <CodeEditorPlaceholder />
      </section>
    </main>
  );
}
