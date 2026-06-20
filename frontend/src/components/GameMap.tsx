export type GameMapStatus = "idle" | "running" | "success" | "error";

type GameMapProps = {
  status: GameMapStatus;
};

const statusLabel: Record<GameMapStatus, string> = {
  idle: "等待运行",
  running: "模拟运行中",
  success: "模拟成功",
  error: "模拟错误"
};

export function GameMap({ status }: GameMapProps) {
  return (
    <section className={`game-map game-map-${status}`} aria-label="CodeBot 地图">
      <div className="map-status">{statusLabel[status]}</div>
      <div className="map-grid" aria-hidden="true">
        <span className="map-cell robot">CodeBot</span>
        <span className="map-cell energy">能量</span>
        <span className="map-cell obstacle">障碍</span>
        <span className="map-cell" />
        <span className="map-cell" />
        <span className="map-cell door">门</span>
        <span className="map-cell" />
        <span className="map-cell" />
        <span className="map-cell exit">出口</span>
      </div>
    </section>
  );
}
