import { Link } from "react-router-dom";
import { CodeEditorPlaceholder } from "../components/CodeEditorPlaceholder";

export function HomePage() {
  const coreFeatures = [
    "C 代码编辑",
    "在线编译运行",
    "自动判题",
    "错误诊断",
    "错题本",
    "教师数据面板"
  ];

  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Web C Learning Game</p>
          <h1 id="home-title">CodeBot C 编程实验室</h1>
          <p className="intro">用 C 语言控制机器人闯关的编程教学游戏</p>
          <section className="home-feature-panel" aria-labelledby="home-features-title">
            <h2 id="home-features-title">核心功能</h2>
            <ul>
              {coreFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <nav className="hero-actions" aria-label="主要导航">
            <Link to="/levels">开始学习</Link>
            <Link to="/levels" className="secondary">
              关卡列表
            </Link>
            <Link to="/mistakes" className="secondary">
              错题本
            </Link>
            <Link to="/teacher-dashboard" className="secondary">
              教师面板
            </Link>
          </nav>
        </div>
        <CodeEditorPlaceholder />
      </section>
    </main>
  );
}
