import { Link } from "react-router-dom";
import { classAnalyticsSummary, levelAnalytics } from "../data/analytics";

type ErrorMetric = {
  key: "compileErrorCount" | "wrongAnswerCount" | "timeoutCount" | "runtimeErrorCount";
  label: "compile_error" | "wrong_answer" | "timeout" | "runtime_error";
};

const errorMetrics: ErrorMetric[] = [
  { key: "compileErrorCount", label: "compile_error" },
  { key: "wrongAnswerCount", label: "wrong_answer" },
  { key: "timeoutCount", label: "timeout" },
  { key: "runtimeErrorCount", label: "runtime_error" }
];

function getErrorCount(metric: ErrorMetric): number {
  return levelAnalytics.reduce((total, level) => total + level[metric.key], 0);
}

function getMasteryRate(passRate: number, averageScore: number): number {
  return Math.round((passRate + averageScore) / 2);
}

function getTeachingAdvice(): string {
  const commonError = classAnalyticsSummary.mostCommonError;

  if (commonError === "wrong_answer") {
    return "建议重点讲解输出格式、条件判断和边界值，尤其关注 energy = 60 这类临界输入。";
  }

  if (commonError === "compile_error") {
    return "建议加强分号、括号、变量声明和 scanf 写法等 C 语言基础语法训练。";
  }

  if (commonError === "timeout") {
    return "建议重点讲解循环终止条件，帮助学生判断 while 和 for 是否能够正常结束。";
  }

  return "建议补充数组下标、除以 0 和非法内存访问等运行时错误案例。";
}

export function TeacherDashboardPage() {
  const maxErrorCount = Math.max(...errorMetrics.map((metric) => getErrorCount(metric)));
  const teachingAdvice = getTeachingAdvice();

  return (
    <main className="page-shell teacher-dashboard">
      <header className="page-header detail-header">
        <Link to="/" className="text-link">
          返回首页
        </Link>
        <p className="eyebrow">Class Analytics</p>
        <h1>教师数据面板</h1>
        <p>用于展示学生在 CodeBot C 编程实验室中的学习情况和常见错误。</p>
      </header>

      <section className="overview-grid" aria-label="班级总体统计">
        <article className="overview-card">
          <span>学生人数</span>
          <strong>{classAnalyticsSummary.totalStudents}</strong>
        </article>
        <article className="overview-card">
          <span>总提交次数</span>
          <strong>{classAnalyticsSummary.totalSubmissions}</strong>
        </article>
        <article className="overview-card">
          <span>平均通过率</span>
          <strong>{classAnalyticsSummary.averagePassRate}%</strong>
        </article>
        <article className="overview-card">
          <span>最薄弱知识点</span>
          <strong>{classAnalyticsSummary.weakestKnowledgePoint}</strong>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-panel dashboard-panel-wide">
          <div className="panel-heading">
            <h2>关卡通过率</h2>
            <span>5 个 MVP 关卡</span>
          </div>
          <div className="analytics-table" role="table" aria-label="关卡通过率数据">
            <div className="analytics-row analytics-header" role="row">
              <span>关卡</span>
              <span>知识点</span>
              <span>通过率</span>
              <span>平均分</span>
              <span>平均提交</span>
            </div>
            {levelAnalytics.map((level) => (
              <div className="analytics-row" role="row" key={level.levelId}>
                <span>{level.levelTitle}</span>
                <span>{level.knowledgePoint}</span>
                <span className="progress-cell">
                  <span className="progress-bar" aria-hidden="true">
                    <span style={{ width: `${level.passRate}%` }} />
                  </span>
                  <strong>{level.passRate}%</strong>
                </span>
                <span>{level.averageScore}</span>
                <span>{level.averageSubmitCount.toFixed(1)} 次</span>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="panel-heading">
            <h2>错误类型分布</h2>
            <span>{classAnalyticsSummary.mostCommonError}</span>
          </div>
          <div className="metric-list">
            {errorMetrics.map((metric) => {
              const count = getErrorCount(metric);
              const width = Math.round((count / maxErrorCount) * 100);

              return (
                <div className="metric-item" key={metric.label}>
                  <div>
                    <strong>{metric.label}</strong>
                    <span>{count} 次</span>
                  </div>
                  <span className="progress-bar" aria-hidden="true">
                    <span style={{ width: `${width}%` }} />
                  </span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="panel-heading">
            <h2>知识点掌握情况</h2>
            <span>{classAnalyticsSummary.weakestKnowledgePoint}</span>
          </div>
          <div className="metric-list">
            {levelAnalytics.map((level) => {
              const masteryRate = getMasteryRate(level.passRate, level.averageScore);

              return (
                <div className="metric-item" key={level.knowledgePoint}>
                  <div>
                    <strong>{level.knowledgePoint}</strong>
                    <span>{masteryRate}%</span>
                  </div>
                  <span className="progress-bar" aria-hidden="true">
                    <span style={{ width: `${masteryRate}%` }} />
                  </span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="dashboard-panel dashboard-panel-wide">
          <div className="panel-heading">
            <h2>教学建议</h2>
            <span>{classAnalyticsSummary.mostDifficultLevel}</span>
          </div>
          <p className="teaching-advice">{teachingAdvice}</p>
          <div className="teaching-facts">
            <span>最难关卡：{classAnalyticsSummary.mostDifficultLevel}</span>
            <span>最常见错误：{classAnalyticsSummary.mostCommonError}</span>
            <span>提示使用最多：仓库最大能量箱</span>
          </div>
        </article>
      </section>
    </main>
  );
}

