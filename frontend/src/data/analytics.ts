export type LevelAnalytics = {
  levelId: string;
  levelTitle: string;
  knowledgePoint: string;
  passRate: number;
  averageScore: number;
  averageSubmitCount: number;
  compileErrorCount: number;
  wrongAnswerCount: number;
  timeoutCount: number;
  runtimeErrorCount: number;
  hintUsedCount: number;
};

export type ClassAnalyticsSummary = {
  totalStudents: number;
  totalSubmissions: number;
  averagePassRate: number;
  mostDifficultLevel: string;
  mostCommonError: "compile_error" | "wrong_answer" | "timeout" | "runtime_error";
  weakestKnowledgePoint: string;
};

export const classAnalyticsSummary: ClassAnalyticsSummary = {
  totalStudents: 32,
  totalSubmissions: 286,
  averagePassRate: 72,
  mostDifficultLevel: "仓库最大能量箱",
  mostCommonError: "wrong_answer",
  weakestKnowledgePoint: "if else 判断"
};

export const levelAnalytics: LevelAnalytics[] = [
  {
    levelId: "level-001",
    levelTitle: "启动 CodeBot",
    knowledgePoint: "printf 输出",
    passRate: 94,
    averageScore: 96,
    averageSubmitCount: 1.2,
    compileErrorCount: 6,
    wrongAnswerCount: 4,
    timeoutCount: 0,
    runtimeErrorCount: 0,
    hintUsedCount: 8
  },
  {
    levelId: "level-002",
    levelTitle: "输入电量",
    knowledgePoint: "scanf 输入",
    passRate: 82,
    averageScore: 86,
    averageSubmitCount: 1.8,
    compileErrorCount: 12,
    wrongAnswerCount: 10,
    timeoutCount: 1,
    runtimeErrorCount: 3,
    hintUsedCount: 16
  },
  {
    levelId: "level-003",
    levelTitle: "能量门",
    knowledgePoint: "if else 判断",
    passRate: 65,
    averageScore: 72,
    averageSubmitCount: 2.6,
    compileErrorCount: 14,
    wrongAnswerCount: 34,
    timeoutCount: 2,
    runtimeErrorCount: 1,
    hintUsedCount: 28
  },
  {
    levelId: "level-004",
    levelTitle: "重复移动",
    knowledgePoint: "for 循环",
    passRate: 70,
    averageScore: 75,
    averageSubmitCount: 2.4,
    compileErrorCount: 10,
    wrongAnswerCount: 18,
    timeoutCount: 12,
    runtimeErrorCount: 2,
    hintUsedCount: 24
  },
  {
    levelId: "level-005",
    levelTitle: "仓库最大能量箱",
    knowledgePoint: "数组最大值",
    passRate: 49,
    averageScore: 61,
    averageSubmitCount: 3.4,
    compileErrorCount: 18,
    wrongAnswerCount: 31,
    timeoutCount: 6,
    runtimeErrorCount: 9,
    hintUsedCount: 33
  }
];

