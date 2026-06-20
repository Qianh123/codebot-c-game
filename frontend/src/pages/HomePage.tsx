import { Link } from "react-router-dom";
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
            <Link to="/levels">开始学习</Link>
            <Link to="/levels" className="secondary">
              关卡列表
            </Link>
          </nav>
        </div>
        <CodeEditorPlaceholder />
      </section>
    </main>
  );
}
