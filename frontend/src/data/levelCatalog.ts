export type LevelCatalogItem = {
  id: string;
  title: string;
};

export const levelCatalog: LevelCatalogItem[] = [
  { id: "level-001", title: "启动 CodeBot" },
  { id: "level-002", title: "输入电量" },
  { id: "level-003", title: "能量门" },
  { id: "level-004", title: "重复移动" },
  { id: "level-005", title: "仓库最大能量箱" },
  { id: "level-006", title: "双数能量合并" },
  { id: "level-007", title: "圆形能量场面积" },
  { id: "level-008", title: "读取指令字符" },
  { id: "level-009", title: "奇偶能量判断" },
  { id: "level-010", title: "正负能量检测" },
  { id: "level-011", title: "三路最大能量" },
  { id: "level-012", title: "成绩等级门" },
  { id: "level-013", title: "闰年时钟" },
  { id: "level-014", title: "编号路线输出" },
  { id: "level-015", title: "前 n 项能量和" },
  { id: "level-016", title: "阶乘能量核心" },
  { id: "level-017", title: "素数通行证" },
  { id: "level-018", title: "数组能量总和" },
  { id: "level-019", title: "数组最小能量箱" },
  { id: "level-020", title: "数组右移传送带" }
];

export function getLevelTitle(levelId: string): string {
  return levelCatalog.find((level) => level.id === levelId)?.title ?? levelId;
}
