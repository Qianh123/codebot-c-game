import { Link } from "react-router-dom";
import { CodeEditorPlaceholder } from "../components/CodeEditorPlaceholder";
import { getLevelTitle, levelCatalog } from "../data/levelCatalog";
import { clearProgress, getProgressRecords } from "../utils/progressStorage";

export function HomePage() {
  const coreFeatures = [
    "C 代码编辑",
    "在线编译运行",
    "自动判题",
    "错误诊断",
    "错题本",
    "教师数据面板"
  ];
  const progressRecords = getProgressRecords();
  const completedCount = progressRecords.filter((record) => record.passed).length;
  const completionRate = Math.round((completedCount / levelCatalog.length) * 100);
  const recentRecord =
    [...progressRecords].sort((left, right) =>
      right.lastSubmittedAt.localeCompare(left.lastSubmittedAt)
    )[0] ?? null;
  const continueTarget = recentRecord
    ? `/levels/${recentRecord.levelId}`
    : "/levels";

  function handleClearProgress() {
    if (window.confirm("确认清空学习进度吗？此操作不会删除错题本。")) {
      clearProgress();
      window.location.reload();
    }
  }

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
          <section className="home-progress-panel" aria-labelledby="home-progress-title">
            <h2 id="home-progress-title">学习进度</h2>
            <div className="home-progress-grid">
              <div>
                <span>总关卡数</span>
                <strong>{levelCatalog.length}</strong>
              </div>
              <div>
                <span>已完成关卡数</span>
                <strong>{completedCount}</strong>
              </div>
              <div>
                <span>当前完成率</span>
                <strong>{completionRate}%</strong>
              </div>
              <div>
                <span>最近学习关卡</span>
                <strong>
                  {recentRecord ? getLevelTitle(recentRecord.levelId) : "暂无记录"}
                </strong>
              </div>
            </div>
            <div className="home-progress-actions">
              <Link to={continueTarget}>继续学习</Link>
              <button type="button" onClick={handleClearProgress}>
                清空学习进度
              </button>
            </div>
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
