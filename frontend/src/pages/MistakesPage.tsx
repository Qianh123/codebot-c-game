import { useState } from "react";
import { Link } from "react-router-dom";
import {
  clearMistakes,
  deleteMistake,
  getMistakes,
  type MistakeRecord
} from "../utils/mistakes";

function formatTime(time: string): string {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return time;
  }

  return date.toLocaleString();
}

export function MistakesPage() {
  const [records, setRecords] = useState<MistakeRecord[]>(() => getMistakes());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleDelete(id: string) {
    setRecords(deleteMistake(id));
    setExpandedId((current) => (current === id ? null : current));
  }

  function handleClear() {
    setRecords(clearMistakes());
    setExpandedId(null);
  }

  return (
    <main className="page-shell">
      <header className="page-header detail-header">
        <Link to="/levels" className="text-link">
          返回关卡列表
        </Link>
        <p className="eyebrow">Mistake Review</p>
        <h1>错题本</h1>
        <p>保存提交失败的记录，方便回顾错误类型、诊断提示和当时的代码。</p>
      </header>

      {records.length === 0 ? (
        <p className="status-text">暂无错题记录</p>
      ) : (
        <section className="mistakes-section">
          <div className="mistakes-toolbar">
            <strong>共 {records.length} 条记录</strong>
            <button type="button" onClick={handleClear}>
              清空错题本
            </button>
          </div>

          <div className="mistake-list">
            {records.map((record) => {
              const isExpanded = expandedId === record.id;

              return (
                <article className="mistake-card" key={record.id}>
                  <div className="mistake-card-header">
                    <div>
                      <h2>{record.levelTitle}</h2>
                      <p>{record.knowledgePoint}</p>
                    </div>
                    <span>{record.errorType}</span>
                  </div>

                  <div className="mistake-meta">
                    <span>得分：{record.score}</span>
                    <span>{formatTime(record.time)}</span>
                  </div>

                  <p>{record.message}</p>

                  <div className="mistake-actions">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : record.id)}
                    >
                      {isExpanded ? "收起" : "展开"}
                    </button>
                    <button
                      type="button"
                      className="secondary-action"
                      onClick={() => handleDelete(record.id)}
                    >
                      删除
                    </button>
                  </div>

                  {isExpanded ? (
                    <div className="mistake-detail">
                      <h3>错误诊断</h3>
                      <p>{record.diagnosis}</p>
                      <h3>提交代码</h3>
                      <pre>{record.code}</pre>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
